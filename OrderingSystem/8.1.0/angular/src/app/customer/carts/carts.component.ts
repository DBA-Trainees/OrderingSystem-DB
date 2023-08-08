import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
} from "@angular/core";
import { Router, Routes } from "@angular/router";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  CartDto,
  CartDtoPagedResultDto,
  CartServiceProxy,
  CreateCartDto,
  CreateOrderDto,
  OrderDto,
  OrderServiceProxy,
} from "@shared/service-proxies/service-proxies";
import * as moment from "moment";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { finalize } from "rxjs/operators";
import { OrdersComponent } from "../orders/order.component";

class PagedCartsRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: "add-to-cart",
  templateUrl: "carts.component.html",
  styleUrls: ["./carts.component.css"],
  animations: [appModuleAnimation()],
})
export class AddToCartsComponent extends PagedListingComponentBase<CartDto> {
  carts: CartDto[] = [];
  keyword = "";
  isActive: boolean | null;
  foodQty: number = 1;
  cart: CartDto = new CartDto();
  order: OrderDto = new OrderDto();
  selectedFoodOrder: number;
  availableSizesDict: { [key: number]: string[] } = {};
  selected: boolean;
  overallTotalAmount: number = 0;
  today = new Date();
  selectedCarts: CartDto[] = [];
  createOrder = new CreateOrderDto();
  createCarts: CreateCartDto[] = [];
  id: number = 0;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _cartService: CartServiceProxy,
    private _orderService: OrderServiceProxy,
    private _modalService: BsModalService,
    public bsModalRef: BsModalRef,
    private router: Router
  ) {
    super(injector);
  }

  protected list(
    request: PagedCartsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._cartService
      .getAllOrderInCart(
        request.keyword,
        request.isActive,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: CartDtoPagedResultDto) => {
        this.carts = result.items;
        this.showPaging(result, pageNumber);
        this.setDefaultAvailableSizes();
      });
  }

  updateOrder(cart: CartDto): void {
    this._cartService.update(cart).subscribe(() => {
      this.notify.info(this.l("OrderUpdatedSuccessfully"));
    });
  }

  private setDefaultAvailableSizes(): void {
    this.carts.forEach((cart) => {
      if (cart.food && cart.food.size) {
        const sizeArray = cart.food.size.split(",").map((size) => size.trim());
        this.availableSizesDict[cart.food.id] = sizeArray;
      }
    });
  }

  grandTotalPrice(cart: CartDto): number {
    let updatedPrice = cart.food.price;

    if (cart.size == "Medium") {
      updatedPrice += 15;
    } else if (cart.size == "Large") {
      updatedPrice += 25;
    }

    if (cart.food.category && cart.food.category.name == "Group") {
      updatedPrice *= 2;
    }

    return updatedPrice * cart.quantity;
  }

  protected delete(cart: CartDto): void {
    abp.message.confirm(
      this.l("OrderDeleteWarningMessage", cart.food.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._cartService.delete(cart.id).subscribe(() => {
            abp.notify.success(this.l("SuccessfullyDeleted"));
            this.refresh();
          });
        }
      }
    );
  }

  proceedOrder(id): void {
    const groupedCarts: { [key: string]: CartDto[] } = {};

  for (const cart of this.selectedCarts) {
    const groupKey = "group"; 
    if (!groupedCarts[groupKey]) {
      groupedCarts[groupKey] = [];
    }
    groupedCarts[groupKey].push(cart);
  }

  const createOrders: CreateOrderDto[] = [];

  for (const groupKey in groupedCarts) {
    if (groupedCarts.hasOwnProperty(groupKey)) {
      const cartsInGroup = groupedCarts[groupKey];

      const createOrder = new CreateOrderDto();
      createOrder.cartId = cartsInGroup[0].id;
      createOrder.dateTimeOrdered = moment(this.today);
      createOrder.totalAmount = cartsInGroup.reduce((total, cart) => total + this.grandTotalPrice(cart), 0);

      createOrders.push(createOrder);
    }
  }
  this.orderNow(this.cart.id);
    /* this._orderService.createMultipleCartOrder(createOrders).subscribe((res) => {
      this.orderNow(this.cart.id);
      this.notify.info(this.l("SavedSuccessfully"));
      this.bsModalRef.hide();
      this.onSave.emit(res);
    }); */
  }
  
  

  selectAll(event): void {
    if (event.target.checked) {
      this.selectedCarts = this.carts.slice();
    } else {
      this.selectedCarts = [];
    }
    this.recalculateOverallTotalAmount();
  }

  recalculateOverallTotalAmount(): void {
    this.order.totalAmount = this.overallTotalAmount;
    this.overallTotalAmount = this.selectedCarts.reduce(
      (total, cart) => total + this.grandTotalPrice(cart),
      0
    );
  }

  selectCart(cart: CartDto, selected: boolean): void {
    const foundCart = this.carts.find(c => c.id === cart.id);
    if (selected) {
      if (!this.selectedCarts.some(c => c.id === foundCart.id)) {
        this.selectedCarts.push(foundCart);
      }
    } else {
      this.selectedCarts = this.selectedCarts.filter(c => c.id !== foundCart.id);
    }
    this.recalculateOverallTotalAmount();
  }

  orderNow(id): void{
    this.showOrderDetailsModal(id);
  }

  private showOrderDetailsModal(id?: number): void {
    let orderDetailsModal: BsModalRef;
    orderDetailsModal = this._modalService.show(OrdersComponent, {
      class: "modal-lg",
      initialState: {
        id: id,
      },
    });
  }
}