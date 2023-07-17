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
  OrderDto,
  OrderServiceProxy,
  TypeDto,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";

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
  foods: FoodDto[] = [];
  food: FoodDto = new FoodDto();
  order: OrderDto = new OrderDto();
  types: TypeDto[] = [];
  categories: CategoryDto[] = []; 
  keyword = "";
  isActive: boolean | null;
  id: number = 0;
  foodQty: number = 1;
  typeName: string;
  saving: boolean;
  selectedFoodSize: string;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector, 
    public bsModalRef: BsModalRef,
    private _foodService: FoodServiceProxy,
    private _orderService: OrderServiceProxy
    ) {
    super(injector);
  }

  ngOnInit(): void {
    this.food.size = this.selectedFoodSize;
    /* this.foodQty = this.food.quantity; */
    if (this.selectedFoodSize){
      this.food.size = this.selectedFoodSize;
      var regex = new RegExp("(?=[0-9],)");
      this.selectedFoodSize.split(regex);
    }
    if(this.id != 0){
      this._foodService.get(this.id).subscribe((res) =>{
        this.food = res;
        this.food.type = res.type;
        this.food.category = res.category;
      })
    }

  }

  decrementQty(): void{
    if(this.food.quantity >1){
      this.foodQty--;      
    }
  }

  incrementQty(maxQty: number): void{
    if(this.foodQty < this.food.quantity){
      this.foodQty++;
    }
  }


  save(): void{
    this.saving = true;
    this.food.size = this.selectedFoodSize;

    this._orderService.create(this.order).subscribe(() =>{
      this.notify.info(this.l('SavedSuccessfully'));
          this.bsModalRef.hide();
          this.onSave.emit();
    },
    () =>{
      this.saving = false;
    });
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
