import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { Router } from "@angular/router";
import { AppComponentBase } from "@shared/app-component-base";
import {
  CustomerDto,
  FoodDto,
  FoodServiceProxy,
  OrderDto,
  OrderServiceProxy,
  UserDto,
} from "@shared/service-proxies/service-proxies";
import * as moment from "moment";
import { BsModalRef } from "ngx-bootstrap/modal";


@Component({
  selector: "food-details",
  templateUrl: "food-details.component.html",
  styleUrls: ["../../../../shared/styles/styles.css",'./food-details.component.css'],
})
export class FoodDetailsComponent extends AppComponentBase implements OnInit {
  foods: FoodDto[] = [];
  food: FoodDto = new FoodDto();
  order: OrderDto = new OrderDto();
  customer: CustomerDto = new CustomerDto();
  user: UserDto = new UserDto();
  keyword = "";
  isActive: boolean | null;
  id: number = 0;
  foodQty: number = 1;
  typeName: string;
  saving: boolean;
  today = new Date();
  selectedFoodSize: string;
  defaultOpacity: number = 1;
  soldOutOpacity: number = 0.5;

  @Output() onSave = new EventEmitter<any>();
  @Input() formDisabled: boolean;

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _foodService: FoodServiceProxy,
    private _orderService: OrderServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.id != 0) {
      this._foodService.getAllFoodWithCategory(this.id).subscribe((res) => {
        this.food = res;
        this.food.category.id = res.category.id;
        /* this.food.type.id = res.type.id; */
      });
    }
    this.setDefaultFoodSize();
  }

  decrementQty(): void {
    if (this.food.quantity > 1) {
      this.foodQty--;
    }
  }

  incrementQty(maxQty: number): void {
    if (this.foodQty < this.food.quantity) {
      this.foodQty++;
    }
  }

  private setDefaultFoodSize(): void {
    if (this.food.size) {
      const sizeArray = this.food.size.split(',');
      this.selectedFoodSize = sizeArray[0].trim();
    }
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

  save(food:FoodDto): void {
    this.saving = true;

    const orderDto = new OrderDto();   
    orderDto.foodId = food.id;
    orderDto.quantity = this.foodQty;
    orderDto.totalAmount = this.foodQty * food.price;
    orderDto.dateTimeAddedToCart = moment(this.today);
    orderDto.size = this.selectedFoodSize;
    orderDto.orderStatusId = 1;

    this._orderService.updateAddToCart(orderDto).subscribe(
      (res) => {
        this.notify.info(this.l("AddToCart"));
        this.bsModalRef.hide();
        this.onSave.emit(res);
      },
      () => {
        this.saving = false;
      }
    );
  }
  
}
