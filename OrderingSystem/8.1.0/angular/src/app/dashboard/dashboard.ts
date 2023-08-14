import { Component, Inject, Injector, OnInit, Type } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  CategoryServiceProxy,
  CustomerServiceProxy,
  DivisionServiceProxy,
  OrderDto,
  OrderServiceProxy,
  TypeServiceProxy,
  UserServiceProxy,
} from "@shared/service-proxies/service-proxies";

@Component({
  selector: "dashboard-main",
  templateUrl: "dashboard.html",
})
export class DashboardComponent extends AppComponentBase implements OnInit {
  order = new OrderDto();
  orderRowCount: number;
  categoryRowCount: number;
  customerRowCount: number;
  typeRowCount: number;
  divisionRowCount: number;
  userRowCount: number;
  mostPurchasedFood: string;
  mostPurchasedFoodRowCount: number;

  constructor(
    injector: Injector,
    private _orderService: OrderServiceProxy,
    private _categoryService: CategoryServiceProxy,
    private _customerService: CustomerServiceProxy,
    private _typeService: TypeServiceProxy,
    private _divisionService: DivisionServiceProxy,
    private _userService: UserServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getOrderRowCount();
    this.getCategoryRowCount();
    this.getCustomerRowCount();
    this.getFoodTypeRowCount();
    this.getDivisionRowCount();
    this.getUsersRowCount();
    this.getMostPurchaseFood();
    /* this.getMostPurchaseFoodCount(); */
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

  getMostPurchaseFood(): void {
    this._orderService.getMostPurchasedFoodId().subscribe((foodName) => {
      this.mostPurchasedFood = foodName;
    });
  }

  /* getMostPurchaseFoodCount(): void {
    this._orderService.getMostPurchasedFoodRowCount(this.mostPurchasedFoodRowCount).subscribe((id) => {
      this.mostPurchasedFoodRowCount = id;
    });
  } */
}
