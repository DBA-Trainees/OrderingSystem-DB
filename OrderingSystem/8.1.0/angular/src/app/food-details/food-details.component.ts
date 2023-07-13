import { Component, EventEmitter, Injector, OnInit, Output } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  CategoryDto,
  FoodDto,
  FoodDtoPagedResultDto,
  FoodServiceProxy,
  TypeDto,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";
import { finalize } from "rxjs/operators";

class PagedFoodsRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: "food-details",
  templateUrl: "food-details.component.html",
  styleUrls: [
    "./food-details.component.css",
    "../../shared/styles/styles.css",
  ],
})
export class FoodDetailsComponent /* extends PagedListingComponentBase<FoodDto>  */
extends AppComponentBase
implements OnInit{
  foods: FoodDto[];
  food: FoodDto = new FoodDto();
  types: TypeDto[] = [];
  categories: CategoryDto[] = []; 
  keyword = "";
  isActive: boolean | null;
  id: number = 0;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector, 
    public bsModalRef: BsModalRef,
    private _foodService: FoodServiceProxy) {
    super(injector);
  }

  ngOnInit(): void {
    if(this.id != 0){
      this._foodService.get(this.id).subscribe((res) =>{
        this.food = res;
        this.food.type = res.type;
        this.food.category = res.category;
      })
    }
  }

  

  /* protected list(
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
  } */
  
}
