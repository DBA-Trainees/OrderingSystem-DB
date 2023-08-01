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
  CreateOrderDto,
  FoodDto,
  FoodServiceProxy,
  OrderDto,
  OrderServiceProxy,
  UserDto,
} from "@shared/service-proxies/service-proxies";
import * as moment from "moment";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "food-list",
  templateUrl: "food-list.component.html",
  styleUrls: ["./food-list.component.css"],
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
  foodQty: number = 1;
  id: number = 0;
  saving = false;
  today = new Date();
  sizes: string[];
  user: UserDto = new UserDto();
  availableSizesDict: { [key: number]: string[] } = {};

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
      this.setDefaultFoodSizes();
      this.foods.forEach((food) => (this.foodQty = 1));
    })
  }

  displayFoodDetails(id): void {
    this.showFoodDetailsModal(id);
  }

  addTocart(selectedFood: FoodDto): void {
    this.saving = true;
    const orderDto = new CreateOrderDto();
    orderDto.foodId = selectedFood.id;
    orderDto.quantity = this.foodQty;
    orderDto.totalAmount = selectedFood.price * this.foodQty;
    orderDto.dateTimeOrdered = moment.utc(this.today);
    orderDto.size = selectedFood.size;

    this._orderService.create(orderDto).subscribe(
      (res) => {
        this.notify.info(this.l("SavedSuccessfully"));
        this.bsModalRef.hide();
        this.onSave.emit(res);

        this.foods = this.foods.filter(food => food.id !== selectedFood.id);

        this.router.navigate(["./app/customer/carts"]);
      },
    );
  }

  formatLastModificationDate(lastModificationDate: Date): string {
    const currentTime = new Date();
    const difference = Math.round((currentTime.getTime() - new Date(lastModificationDate).getTime()) / 60000);
    if (difference < 1) {
      return 'just now';
    } else if (difference === 1) {
      return '1 min ago';
    } else {
      return `${difference} ago`;
    }
  }

  private setDefaultFoodSizes(): void {
    this.foods.forEach((food) => {
      if (food.size) {
        const sizeArray = food.size.split(',').map((size) => size.trim());
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
}