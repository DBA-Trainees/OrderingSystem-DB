import { DatePipe } from "@angular/common";
import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { Router } from "@angular/router";
import { FoodDetailsComponent } from "@app/customer/food-list/food-details/food-details.component";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import { AppComponentBase } from "@shared/app-component-base";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  CreateOrderDto,
  FoodDto,
  FoodDtoPagedResultDto,
  FoodServiceProxy,
  OrderDto,
  OrderServiceProxy,
  UserDto,
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
  styleUrls: ["../../../shared/styles/main.css", "./food-list.component.css"],
  animations: [appModuleAnimation()],
})
export class FoodListComponent extends AppComponentBase implements OnInit {
  orders: OrderDto[] = [];
  foods: FoodDto[] = [];
  order = new OrderDto();
  food = new FoodDto();
  keyword = "";
  isActive: boolean | null;
  skipCount: number;
  maxResultCount: number;
  foodQty: number;
  id: number = 0;
  saving = false;
  today = new Date();
  selectedFoodSize: string;
  user: UserDto = new UserDto();

  @Output() onSave = new EventEmitter<any>();
  @Input() saveLabel = this.l('Add To Cart');
  @Input() saveDisabled: boolean;

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

  ngOnInit(): void {
    this.getAllFoods();
  }

  getAllFoods(): void{
    this._foodService.getAllAvailableFoods(
      this.keyword,
      this.isActive,
      this.skipCount,
      this.maxResultCount)
      .subscribe((result) =>
      {
      this.foods = result.items;
    })
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

  displayFoodDetails(id): void {
    this.showFoodDetailsModal(id);
  }

  addTocart(): void {
    this.saving = true;
    const orderDto = new CreateOrderDto();
    orderDto.foodId = this.food.id;
    orderDto.quantity = this.foodQty;
    orderDto.totalAmount = this.foodQty * this.food.price;
    orderDto.dateTimeOrdered = moment.utc(this.today);

    this._orderService.create(orderDto).subscribe(
      (res) => {
        this.notify.info(this.l("SavedSuccessfully"));
        this.bsModalRef.hide();
        this.onSave.emit(res);

        this.router.navigate(["./app/customer/carts"]);
      },
    );
  }

  formatLastModificationDate(lastModificationDate: Date): string {
    const currentTime = new Date();
    const difference = Math.round((currentTime.getTime() - new Date(lastModificationDate).getTime()) / 60000); // Difference in minutes

    if (difference < 1) {
      return 'just now';
    } else if (difference === 1) {
      return '1 min ago';
    } else {
      return `${difference} ago`;
    }
  }

  private showFoodDetailsModal(id?: number): void {
    let foodDetailsModal: BsModalRef;
    /* if(!id){ */
    foodDetailsModal = this._modalService.show(FoodDetailsComponent, {
      class: "modal-lg",
      initialState: {
        id: id,
      },
    });
  }
}