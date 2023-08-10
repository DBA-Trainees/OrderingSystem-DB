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
  CreateOrderDto,
  FoodDto,
  OrderDto,
  OrderDtoPagedResultDto,
  OrderServiceProxy,
} from "@shared/service-proxies/service-proxies";
import * as moment from "moment";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { finalize } from "rxjs/operators";
import { OrdersComponent } from "../orders/order.component";

class PagedOrdersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: "add-to-cart",
  templateUrl: "carts.component.html",
  styleUrls: ["./carts.component.css"],
  animations: [appModuleAnimation()],
})
export class AddToCartsComponent extends PagedListingComponentBase<OrderDto> {
  
  orders: OrderDto[] = [];
  keyword = "";
  isActive: boolean | null;
  foodQty: number = 1;
  order: OrderDto = new OrderDto();
  food: FoodDto = new FoodDto();
  selectedFoodOrder: number;
  availableSizesDict: { [key: number]: string[] } = {};
  selected: boolean;
  overallTotalAmount: number = 0;
  today = new Date();
  selectedOrder: OrderDto[] = [];
  id: number = 0;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _orderService: OrderServiceProxy,
    private _modalService: BsModalService,
    public bsModalRef: BsModalRef,
    private router: Router
  ) {
    super(injector);
  }

  protected list(
    request: PagedOrdersRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._orderService
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
      .subscribe((result: OrderDtoPagedResultDto) => {
        this.orders = result.items;
        this.showPaging(result, pageNumber);
        this.setDefaultAvailableSizes();
      });
  }

  updateOrder(order: OrderDto): void {
    this._orderService.update(order).subscribe(() => {
      this.notify.info(this.l("OrderUpdatedSuccessfully"));
    });
  }

  private setDefaultAvailableSizes(): void {
    this.orders.forEach((order) => {
      if (order.food && order.food.size) {
        const sizeArray = order.food.size.split(",").map((size) => size.trim());
        this.availableSizesDict[order.food.id] = sizeArray;
      }
    });
  }

  grandTotalPrice(order: OrderDto): number {
    let updatedPrice = order.food?.price;

    if (order.size == "Medium") {
      updatedPrice += 15;
    } else if (order.size == "Large") {
      updatedPrice += 25;
    }

    if (order.food?.category && order.food?.category?.name == "Group") {
      updatedPrice *= .5;
    }

    return updatedPrice * order.quantity;
  }

  protected delete(order: OrderDto): void {
    abp.message.confirm(
      this.l("OrderDeleteWarningMessage", order.food.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._orderService.delete(order.id).subscribe(() => {
            abp.notify.success(this.l("SuccessfullyDeleted"));
            this.refresh();
          });
        }
      }
    );
  }
 
  proceedOrder(orderId: number): void {

    const totalAmount = this.selectedOrder.reduce((total, order) => this.grandTotalPrice(order),0);
    
    const orderDto = new OrderDto();
    
    orderDto.orders = this.selectedOrder.map( order =>{
      const postOrder = new OrderDto();
      postOrder.foodId = order.food.id;
      postOrder.id = order.id;
      postOrder.userId = order.userId;
      postOrder.orderStatusId = order.orderStatusId;
      postOrder.size = order.size;
      postOrder.quantity = order.quantity;
      postOrder.totalAmount = totalAmount;
      postOrder.dateTimeOrdered = moment(this.today);
      return postOrder;
    });

    /* this.orderNow(orderId); */

    this._orderService.updateBeforeProceedOrder(orderDto).subscribe(res => {
      orderId = res.id;
      /* if (res.id) {*/
        this.orderNow(res.id); 
        this.notify.info(this.l("SavedSuccessfully"));
        this.bsModalRef.hide();
        this.onSave.emit(res);
      /* } */
    });
  }
  

  selectAll(event): void {
    if (event.target.checked) {
      this.selectedOrder = this.orders.slice();
    } else {
      this.selectedOrder = [];
    }
    this.recalculateOverallTotalAmount();
  }

  recalculateOverallTotalAmount(): void {
    this.order.totalAmount = this.overallTotalAmount;
    this.overallTotalAmount = this.selectedOrder.reduce(
      (total, order) => total + this.grandTotalPrice(order),
      0
    );
  }

  selectCart(order: OrderDto, selected: boolean): void {
    const foundOrder = this.orders.find(c => c.id === order.id);
    if (selected) {
      if (!this.selectedOrder.some(c => c.id === foundOrder.id)) {
        this.selectedOrder.push(foundOrder);
      }
    } else {
      this.selectedOrder = this.selectedOrder.filter(c => c.id !== foundOrder.id);
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