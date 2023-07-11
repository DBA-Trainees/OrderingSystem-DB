import { Component, Injector, OnInit } from "@angular/core";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  FoodDto,
  FoodDtoPagedResultDto,
  FoodServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { finalize } from "rxjs/operators";

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
export class FoodDetailsComponent extends PagedListingComponentBase<FoodDto> {
  foods: FoodDto[] = [];
  keyword = "";
  isActive: boolean | null;

  constructor(injector: Injector, private _foodService: FoodServiceProxy) {
    super(injector);
  }

  protected list(
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
  }
}
