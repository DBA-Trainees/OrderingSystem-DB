import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
} from "@angular/core";
import { Router } from "@angular/router";
import { AppComponentBase } from "@shared/app-component-base";
import {
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  CategoryDto,
  CategoryServiceProxy,
  CreateOrderDto,
  CustomerDto,
  FoodDto,
  FoodServiceProxy,
  OrderDto,
  OrderServiceProxy,
  TypeDto,
  TypeServiceProxy,
  UserDto,
} from "@shared/service-proxies/service-proxies";
import * as moment from "moment";
import { BsModalRef } from "ngx-bootstrap/modal";


@Component({
  selector: "food-details",
  templateUrl: "food-details.component.html",
  styleUrls: ["../../../../shared/styles/styles.css"],
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
  selectedFoodSize: string = "Regular";
  today = new Date();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _foodService: FoodServiceProxy,
    private _orderService: OrderServiceProxy,
    private router: Router
  ) {
    super(injector);
  }

  ngOnInit(): void {
    /*    order.dateTimeOrdered = this.formatDate(this.today);
   order.food.type.id = this.type.id;
 */
   this.order.food = this.food;
   this.order.user = this.user;
    if (this.food.size) {
      this.selectedFoodSize = this.food.size.split(",")[0];
    }
    if (this.id != 0) {
      this._foodService.get(this.id).subscribe((res) => {
        this.food = res;
        this.food.type = res.type;
        this.food.category = res.category;
      });
    }
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

  formatDate(date) {
    var d = new Date(date);
    date = [
      d.getFullYear(),
      ("0" + (d.getMonth() + 1)).slice(-2),
      ("0" + d.getDate()).slice(-2),
    ].join("-");

    return date;
  }

  save(): void {
    this.saving = true;

    const orderDto = new CreateOrderDto();   
    orderDto.foodId = this.food.id;
    orderDto.quantity = this.foodQty;
    orderDto.totalAmount = this.foodQty * this.food.price;
    orderDto.dateTimeOrdered = moment(this.today);

    this._orderService.create(orderDto).subscribe(
      (res) => {
        this.notify.info(this.l("SavedSuccessfully"));
        this.bsModalRef.hide();
        this.onSave.emit(res);

        this.router.navigate(["./app/customer/carts"]);
      },
      () => {
        this.saving = false;
      }
    );
  }
}
