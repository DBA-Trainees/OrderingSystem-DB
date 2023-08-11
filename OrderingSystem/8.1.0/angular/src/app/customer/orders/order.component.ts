import { Component, Injector, OnInit } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
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
  orders: OrderDto[] = [];
  orderIds: any[]=[];

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
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

  displayAllPurchaseOrder(): void{
    this._orderService.getAllOrderWithOrderNumbers(this.orderIds).subscribe(orders => {      
      this.orders = orders;
    });
  }

  getAllOrdersByOrderNumber(orderNumber: string):OrderDto[]{
    return this.orders.filter (order => order.orderNumber ==  orderNumber && order.dateTimeOrdered)
  }

  
}
