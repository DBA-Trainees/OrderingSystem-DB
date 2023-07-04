import { Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { OrderDto, OrderDtoPagedResultDto, OrderServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';

class PagedOrdersRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
  }

@Component({
    selector: 'order-list',
    templateUrl: 'order-list.component.html',
    styleUrls: ["../../shared/styles/main.css"],
    animations: [appModuleAnimation()],
})

export class OrderListComponent extends PagedListingComponentBase<OrderDto> {
    orders: OrderDto[] = [];
    keyword = "";
    isActive: boolean | null;

    constructor(
        injector: Injector,
        private _orderService: OrderServiceProxy
    ){
        super(injector)
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

      addToCart(){
        
      }
}