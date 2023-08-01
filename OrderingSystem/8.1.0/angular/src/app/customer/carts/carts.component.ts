import { Component, Injector, OnInit } from "@angular/core";
import { Routes } from "@angular/router";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  FoodDto,
  OrderDto,
  OrderDtoPagedResultDto,
  OrderServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalService } from "ngx-bootstrap/modal";
import { finalize } from "rxjs/operators";


class PagedOrdersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: "add-to-cart",
  templateUrl: "carts.component.html",
  styleUrls: ["./carts.component.css"],
  animations: [appModuleAnimation()],
})
export class AddToCartsComponent extends PagedListingComponentBase<OrderDto> {
  orders: OrderDto[] = [];
  keyword = "";
  isActive: boolean | null;
  foodQty: number = 1;
  order: OrderDto = new OrderDto();
  selectedFoodOrder: number;
  availableSizesDict: { [key: number]: string[] } = {};

  constructor(
    injector: Injector,
    private _orderService: OrderServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  protected list(
    request: PagedOrdersRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._orderService
      .getAllOrderInCart(
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
      .subscribe((result: OrderDtoPagedResultDto) => {
        this.orders = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  decrementQty(): void {
    if (this.order.quantity > 1) {
      this.foodQty--;
    }
  }

  incrementQty(maxQty: number): void {
    if (this.foodQty < this.order.quantity) {
      this.foodQty++;
    }
  }

  updateOrder(order: OrderDto): void {
    this._orderService.update(order).subscribe(() => {
      this.notify.info(this.l('OrderUpdatedSuccessfully'));
    });
  }

  private setDefaultAvailableSizes(): void {
    this.orders.forEach((order) => {
      if (order.food && order.food.size) {
        const sizeArray = order.food.size.split(',').map((size) => size.trim());
        this.availableSizesDict[order.food.id] = sizeArray;
      }
    });
  }

  /* isFoodOrderChecked(checked: boolean): void{
    if (checked) {
      if (!this.selectedFoodOrder.includes(size)) {
        this.selectedSize.push(size);
      }
    } else {
      const index = this.selectedSize.indexOf(size);
      if (index !== -1) {
        this.selectedSize.splice(index, 1);
      }
    }
  } */


  
  protected delete(order: OrderDto): void {
    abp.message.confirm(
      this.l("OrderDeleteWarningMessage", order.food.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._orderService.delete(order.id).subscribe(() => {
            abp.notify.success(this.l("SuccessfullyDeleted"));
            this.refresh();
          });
        }
      }
    );
  }
}
