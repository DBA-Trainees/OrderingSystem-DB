import { Component, Injector, OnInit } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  CartDto,
  CartServiceProxy,
  OrderDto,
  OrderServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "order-component",
  templateUrl: "order.component.html",
  styleUrls: ["./order.component.css"],
})
export class OrdersComponent extends AppComponentBase implements OnInit {
  saving: boolean = false;
  id: number = 0;
  order: OrderDto = new OrderDto();
  cart = new CartDto();

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _cartService: CartServiceProxy,
    private _orderService: OrderServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.id != 0) {
      this._orderService.getOrder(this.id).subscribe((res) => {
        this.order = res;
      });
    }
  }

  checkOutOrder(): void {
    /* const groupedCarts: { [key: string]: CartDto[] } = {};

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
        createOrder.totalAmount = cartsInGroup.reduce(
          (total, cart) => total + this.grandTotalPrice(cart),
          0
        );

        createOrders.push(createOrder);
      }
    }

    this._orderService
      .createMultipleCartOrder(createOrders)
      .subscribe((res) => {
        this.orderNow(this.cart.id);
        this.notify.info(this.l("SavedSuccessfully"));
        this.bsModalRef.hide();
        this.onSave.emit(res);
      }); */
    }
  
}
