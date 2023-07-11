import { Component, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { FoodDto, FoodDtoPagedResultDto, FoodServiceProxy, OrderDto, OrderDtoPagedResultDto, OrderServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';

class PagedFoodsRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
  }

@Component({
    selector: 'food-list',
    templateUrl: 'food-list.component.html',
    styleUrls: ["../../shared/styles/main.css"],
    animations: [appModuleAnimation()],
})

export class FoodListComponent extends PagedListingComponentBase<FoodDto> {
    orders: OrderDto[] = [];
    foods: FoodDto[] = [];
    keyword = "";
    isActive: boolean | null;

    constructor(
        injector: Injector,
        private _foodService : FoodServiceProxy,
        private _orderService: OrderServiceProxy
    ){
        super(injector)
    }

    protected list(
        request: PagedFoodsRequestDto,
        pageNumber: number,
        finishedCallback: Function
      ): void {
        request.keyword = this.keyword;
        request.isActive = this.isActive;
    
        this._foodService
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
          .subscribe((result: FoodDtoPagedResultDto) => {
            this.foods = result.items;
            this.showPaging(result, pageNumber);
          });
      }

      addToCart(){
        
      }
}