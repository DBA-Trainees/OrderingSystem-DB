import { Component, Injector } from "@angular/core";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  FoodDto,
  FoodDtoPagedResultDto,
  FoodServiceProxy
} from "@shared/service-proxies/service-proxies";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { finalize } from "rxjs/operators";
import { CreateEditFoodModalComponent } from "./create-edit-food-modal/create-edit-food-modal.component";
import { Router } from "@angular/router";

class PagedFoodsRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: "foods-component",
  templateUrl: "foods.component.html",
  styleUrls: ["../../../shared/styles/main.css"],
  animations: [appModuleAnimation()],
})
export class FoodsComponent extends PagedListingComponentBase<FoodDto> {
  foods: FoodDto[] = [];
  keyword = "";
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _foodService: FoodServiceProxy,
    private _modalService: BsModalService,
    private _router: Router,
  ) {
    super(injector);
  }

  createFood(): void {
    this.showCreateOrEditFoodModal();
  }

  editFood(id): void {
    this.showCreateOrEditFoodModal(id);
  }

  protected list(
    request: PagedFoodsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._foodService
      .getAllAvailableFoods(
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
  protected delete(food: FoodDto): void {
    abp.message.confirm(
      this.l("FoodDeleteWarningMessage", food.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._foodService.delete(food.id).subscribe(() => {
            abp.notify.success(this.l("SuccessfullyDeleted"));
            this.refresh();
          });
        }
      }
    );
  }

  private showCreateOrEditFoodModal(id?: number): void{
    let createOrEditFoodModal: BsModalRef;
    if(!id){
        createOrEditFoodModal = this._modalService.show(
        CreateEditFoodModalComponent,
        {
          class: 'modal-lg',
        }
      );
    }else{
        createOrEditFoodModal = this._modalService.show(
            CreateEditFoodModalComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditFoodModal.content.onSave.subscribe(() =>{
      this.refresh();
    })
  }
}
