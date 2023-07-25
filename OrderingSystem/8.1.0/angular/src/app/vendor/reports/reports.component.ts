import { Component, Injector, OnInit } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { OrderDto, OrderDtoPagedResultDto, OrderServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

class PagedOrdersRequestDto extends PagedRequestDto{
    keyword: string;
    isActive: boolean | null;
}

@Component({
    selector: 'sales-report',
    templateUrl: 'reports.component.html'
})

 export class ReportsComponent extends PagedListingComponentBase<OrderDto>{
    orders: OrderDto[] = [];
    keyword = "";
    isActive: boolean | null;

    constructor(
        injector: Injector,
        private _orderService: OrderServiceProxy,
        private _modalService: BsModalService
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
          .getAll(
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
      }
 }