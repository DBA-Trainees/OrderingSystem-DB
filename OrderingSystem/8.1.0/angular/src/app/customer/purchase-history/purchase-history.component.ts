import { Component, Injector, OnInit } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  OrderDto,
  OrderServiceProxy,
} from "@shared/service-proxies/service-proxies";

class PagedOrdersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: "purchase-history",
  templateUrl: "purchase-history.component.html",
  styleUrls: ["./pruchase-history.component.css"],
})


export class PurchaseHistoryComponent
  extends AppComponentBase
  implements OnInit
{
  keyword: string = "";
  isActive: boolean | null;
  skipCount: number;
  maxResultCount: number;
  order: OrderDto = new OrderDto();
  orders: OrderDto[] = [];
  orderIds: any[] = [];
  overallTotalAmount: number = 0;

  constructor(
    injector: Injector, 
    private _orderService: OrderServiceProxy) {
    super(injector);
  }

  ngOnInit(): void {
    this.displayOrderByOrderNumber();
  }

  displayOrderByOrderNumber(): void {
    this._orderService.getOrderIdsByOrderNumber().subscribe((orders) => {
      this.orderIds = orders;
      this.displayAllPurchaseOrder();
    });
  }

  displayAllPurchaseOrder(): void {
    this._orderService
      .getAllOrderWithOrderNumbers(this.orderIds)
      .subscribe((orders) => {
        this.orders = orders;
      });
  }

  getAllOrdersByOrderNumber(orderNumber: string): OrderDto[] {
    return this.orders.filter(
      (order) => order.orderNumber == orderNumber && order.dateTimeOrdered
    );
  }

  sumTotalAmounts(orders: OrderDto[]): number {
    return orders.reduce((total, order) => total + order.totalAmount, 0);
  }
}
