import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { FoodDetailsComponent } from '@app/food-details/food-details.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { FoodDto, FoodDtoPagedResultDto, FoodServiceProxy, OrderDto, OrderDtoPagedResultDto, OrderServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
        private _orderService: OrderServiceProxy,
        private _modalService: BsModalService
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

      displayFoodDetails(id): void{
        this.showFoodDetailsModal(id);
      }

      private showFoodDetailsModal(id?: number): void{
        let foodDetailsModal: BsModalRef;
        /* if(!id){ */
          foodDetailsModal = this._modalService.show(FoodDetailsComponent,{
            class: 'modal-lg',
            initialState: {
            id: id,
          },
          })
        }
        /* foodDetailsModal.content.onSave.subscribe(() =>{
          this.refresh();
        }) *//* 
      } */
      
}