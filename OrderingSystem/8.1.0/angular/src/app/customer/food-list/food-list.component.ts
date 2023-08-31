import {
  Component,
  EventEmitter,
  Injector,
  Output,
} from "@angular/core";
import { Router } from "@angular/router";
import { FoodDetailsComponent } from "@app/customer/food-list/food-details/food-details.component";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  FoodDto,
  FoodServiceProxy,
  OrderServiceProxy,
  OrderDto,
  FoodDtoPagedResultDto,
} from "@shared/service-proxies/service-proxies";
import * as moment from "moment";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { finalize } from "rxjs/operators";

class PagedFoodsRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: "food-list",
  templateUrl: "food-list.component.html",
  styleUrls: ["./food-list.component.css"],
  animations: [appModuleAnimation()],
})

export class FoodListComponent
  extends PagedListingComponentBase<OrderDto>
{
  foods: FoodDto[] = [];
  food: FoodDto = new FoodDto();
  order: OrderDto = new OrderDto();
  keyword: string = "";
  isActive: boolean | null;
  foodQty: number = 1;
  id: number = 0;
  saving: boolean = false;
  today: Date = new Date();
  availableSizesDict: { [key: number]: string[] } = {};
  defaultOpacity: number = 1;
  soldOutOpacity: number = 0.5;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _foodService: FoodServiceProxy,
    private _orderService: OrderServiceProxy,
    private _modalService: BsModalService,
    public bsModalRef: BsModalRef,
    private router: Router
  ) {
    super(injector);
  }

  protected list(
    request: PagedFoodsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.isActive = this.isActive;
    request.keyword = this.keyword;

    this._foodService
      .getAllAvailableFoods(
        request.keyword,
        request.isActive,
        request.skipCount,
        request.maxResultCount
      ).pipe(
        finalize(() => {
        finishedCallback();
      }))
      .subscribe((result: FoodDtoPagedResultDto) => {
        this.foods = result.items;
        this.showPaging(result, pageNumber);
        this.setDefaultFoodSizes();
        this.foods.forEach((food) => (this.foodQty = 1));
      });
  }

  displayFoodDetails(id): void {
    this.showFoodDetailsModal(id);
  }

  addTocart(selectedFood: FoodDto): void {
    this.order.foodId = selectedFood.id;
    this.order.quantity = this.foodQty;
    this.order.totalAmount = selectedFood.price * this.foodQty;
    this.order.dateTimeAddedToCart = moment(this.today);
    this.order.size = selectedFood.size;
    this.order.orderStatusId = 1;
    this._orderService.updateAddToCart(this.order).subscribe((res) => {
      abp.notify.info(this.l("AddToCart"));
      this.onSave.emit(res);
    });
  }

  grandTotalPrice(food: FoodDto): number {
    let updatedPrice = food.price;

    if (food.size == "Medium") {
      updatedPrice += 15;
    } else if (food.size == "Large") {
      updatedPrice += 25;
    }
    return updatedPrice * this.foodQty;
  }

  private setDefaultFoodSizes(): void {
    this.foods.forEach((food) => {
      if (food.size) {
        const sizeArray = food.size.split(",").map((size) => size.trim());
        food.size = sizeArray[0];
        this.availableSizesDict[food.id] = sizeArray;
      }
    });
  }

  decrementQty(): void {
    if (this.food.quantity > 1) {
      this.foodQty--;
    }
  }

  incrementQty(): void {
    if (this.foodQty < this.food.quantity) {
      this.foodQty++;
    }
  }

  private showFoodDetailsModal(id?: number): void {
    let foodDetailsModal: BsModalRef;
    foodDetailsModal = this._modalService.show(FoodDetailsComponent, {
      class: "modal-lg",
      initialState: {
        id: id,
      },
    });
  }

  openAddToCart(): void{
    this.router.navigate["../app/customer/carts"];
  }
}
