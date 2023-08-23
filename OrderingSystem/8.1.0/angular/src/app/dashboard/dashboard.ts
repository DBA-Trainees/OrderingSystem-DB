import { Component, Injector, OnInit } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  CategoryServiceProxy,
  CustomerServiceProxy,
  DivisionServiceProxy,
  FoodServiceProxy,
  OrderDto,
  OrderServiceProxy,
  RoleDto,
  TypeServiceProxy,
  UserDto,
  UserLoginInfoDto,
  UserServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { AbpSessionService } from "abp-ng2-module";

@Component({
  selector: "dashboard-main",
  templateUrl: "dashboard.html",
})
export class DashboardComponent extends AppComponentBase implements OnInit {
  order: OrderDto = new OrderDto();
  user = new UserDto();
  orderRowCount: number;
  categoryRowCount: number;
  customerRowCount: number;
  typeRowCount: number;
  divisionRowCount: number;
  userRowCount: number;
  foodRowCount: number;
  mostPurchasedFood: string;
  customerMostPurchased: string;
  mostPurchasedFoodRowCount: number;
  foodAvailableCount: number;
  foodUnavailableCount: number;
  roles = new RoleDto();
  id: number;
  loginInfo: UserLoginInfoDto = new UserLoginInfoDto;

  constructor(
    injector: Injector,
    private _orderService: OrderServiceProxy,
    private _categoryService: CategoryServiceProxy,
    private _customerService: CustomerServiceProxy,
    private _typeService: TypeServiceProxy,
    private _divisionService: DivisionServiceProxy,
    private _userService: UserServiceProxy,
    private _foodService: FoodServiceProxy,
    private _sessionService: AbpSessionService
  ) {
    super(injector);
  }

  ngOnInit(): void {

    console.log(this._sessionService.userId);
    
    if(this.id){
      this.user.id == this._sessionService.userId;
    }

    this.getOrderRowCount();
    this.getCategoryRowCount();
    this.getCustomerRowCount();
    this.getFoodTypeRowCount();
    this.getDivisionRowCount();
    this.getUsersRowCount();
    this.getFoodRowCount();
    this.getMostPurchaseFood();
    this.getUserWithMostPurchased();
    this.getAvailableFoodCount();
    this.getUnvailableFoodCount();
  }

  getOrderRowCount(): void {
    this._orderService.getEntityRowCount().subscribe((count: number) => {
      this.orderRowCount = count;
    });
  }

  getCategoryRowCount(): void {
    this._categoryService.getCategoryCount().subscribe((count: number) => {
      this.categoryRowCount = count;
    });
  }

  getCustomerRowCount(): void {
    this._customerService.getCustomerCount().subscribe((count: number) => {
      this.customerRowCount = count;
    });
  }

  getFoodTypeRowCount(): void {
    this._typeService.getFoodTypeCount().subscribe((count: number) => {
      this.typeRowCount = count;
    });
  }

  getDivisionRowCount(): void {
    this._divisionService.getDivisionCount().subscribe((count: number) => {
      this.divisionRowCount = count;
    });
  }

  getUsersRowCount(): void {
    this._userService.getuserCount().subscribe((count: number) => {
      this.userRowCount = count;
    });
  }
  getFoodRowCount(): void {
    this._foodService.getFoodCount().subscribe((count: number) => {
      this.foodRowCount = count;
    });
  }

  getMostPurchaseFood(): void {
    this._orderService.getMostPurchasedFoodId().subscribe((foodName) => {
      this.mostPurchasedFood = foodName;
    });
  }

  getUserWithMostPurchased(): void{
    this._userService.getCustomerWithMostPurchases().subscribe((customer) => {
      this.user = customer;
      this.customerMostPurchased = customer.fullName;
    })
  }

  getAvailableFoodCount(): void{
    this._foodService.getAvailableFoodCount().subscribe((foodAvail) =>{
      this.foodAvailableCount = foodAvail;
    })
  }

  getUnvailableFoodCount(): void{
    this._foodService.getUnavailableFoodCount().subscribe((foodUnavail) =>{
      this.foodUnavailableCount = foodUnavail;
    })
  }

    /* getMostPurchaseFoodCount(): void {
    this._orderService.getMostPurchasedFoodRowCount(this.mostPurchasedFoodRowCount).subscribe((id) => {
      this.mostPurchasedFoodRowCount = id;
    });
  } */
}
