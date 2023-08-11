import { Component, Injector, OnInit } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import { OrderDto, OrderDtoPagedResultDto, OrderServiceProxy } from "@shared/service-proxies/service-proxies";
import { BsModalService } from "ngx-bootstrap/modal";
import { finalize } from "rxjs/operators";

class PagedOrdersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: "purchase-history",
  templateUrl: "purchase-history.component.html",
  styleUrls: ["./pruchase-history.component.css"],
})

export class PurchaseHistoryComponent extends AppComponentBase /* PagedListingComponentBase<OrderDto> */ implements OnInit {
    keyword = "";
    isActive: boolean | null;
    skipCount: number;
    maxResultCount: number;
    order: OrderDto = new OrderDto();
    orders: OrderDto[] = [];
    orderIds: any[]=[];
    overallTotalAmount: number = 0;

    constructor(
        injector: Injector,
        private _orderService: OrderServiceProxy,
        private _modalService: BsModalService
      ) {
        super(injector);
      }

      ngOnInit(): void {
        this.displayOrderByOrderNumber();
        /* this.displayAllPurchaseOrder(); */
      }

  displayOrderByOrderNumber(): void{
    this._orderService.getOrderIdsByOrderNumber().subscribe(orders =>{
      this.orderIds = orders;
      this,this.displayAllPurchaseOrder();    
    })
  }

  displayAllPurchaseOrder(): void{
    this._orderService.getAllOrderWithOrderNumbers(this.orderIds).subscribe(orders => {      
      this.orders = orders;
    });
  }

  getAllOrdersByOrderNumber(orderNumber: string):OrderDto[]{
    return this.orders.filter (order => order.orderNumber ==  orderNumber && order.dateTimeOrdered)
  }
  /* protected list(
    request: PagedOrdersRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._orderService
      .getAllPurchaseOrders(
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
      });

  } */
  
}
