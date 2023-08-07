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
  FoodDto,
  FoodServiceProxy,
  UserDto,
  CartDto,
  CartServiceProxy,
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
  foods: FoodDto[] = [];
  food = new FoodDto();
  cart = new CartDto();
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
    private _cartService: CartServiceProxy,
    private _modalService: BsModalService,
    public bsModalRef: BsModalRef,
    private router: Router
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getAllFoods();

    if (this.id) {
      this._cartService.get(this.id).subscribe((res) => {
        this.cart.foodId = res.foodId;
        this.cart.food.category = res.food.category;
        /* this.selectedFoodSize = res.size.split(','); */
      });
    }
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
    this.cart.foodId = selectedFood.id;
    this.cart.quantity = this.foodQty;
    this.cart.amount = selectedFood.price * this.foodQty;
    this.cart.dateTimeAddedInCart = moment(this.today);
    this.cart.size = selectedFood.size;

      this._cartService.updateAddToCart(this.cart).subscribe(
        (res) => {
          this.notify.info(this.l("SavedSuccessfully"));
          this.bsModalRef.hide();
          this.onSave.emit(res);
  
          this.router.navigate(["./app/customer/carts"]);
        },
      );
  }

  grandTotalPrice(food: FoodDto): number {
    let updatedPrice = food.price;

    if (food.size == "Medium") {
      updatedPrice += 15;
    } else if (food.size == "Large") {
      updatedPrice += 25;
    }

    if (food.category && food.category.name == "Group") {
      updatedPrice *= 2;
    }

    return updatedPrice * this.foodQty;
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