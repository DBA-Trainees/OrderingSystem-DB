import { Component, Injector, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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
  ordernumber: string;
  id: number = 0;
  order: OrderDto = new OrderDto();
  orders: OrderDto[] = [];
  orderIds: any[]=[];

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _orderService: OrderServiceProxy,
    private router: Router
  ) {
    super(injector);
  }

  ngOnInit(): void {
    
    if (this.ordernumber){
      this.getAllOrdersByOrderNumber(this.ordernumber);
    }
  }

  getAllOrdersByOrderNumber(orderNumber: string):void{
    this._orderService.getordersByOrderNumber(orderNumber).subscribe((orders) =>{
      this.orders = orders;
      this.router.navigate(["./app/customer/purchase-history"]);
    });
  }  

  sumTotalAmounts(orders:OrderDto[]): number{
    return orders.reduce((total, order) => total + order.totalAmount, 0);
  }

  getOrdersByOrderNumber(orderNumber: string):OrderDto[]{
    return this.orders.filter (order => order.orderNumber ==  orderNumber && order.dateTimeOrdered)
  }
  
}
