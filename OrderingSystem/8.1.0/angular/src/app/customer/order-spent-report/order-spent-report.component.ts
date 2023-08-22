import { Component, Injector, OnInit } from "@angular/core";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  OrderDto,
  OrderDtoPagedResultDto,
  OrderServiceProxy,
  TotalSalesDto,
} from "@shared/service-proxies/service-proxies";
import * as moment from "moment";
import { finalize } from "rxjs/operators";

class PagedOrdersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

class SalesData {
  dateTimeOrdered: string;
  totalAmount: number;
}

@Component({
  selector: "order-spent-report",
  templateUrl: "order-spent-report.component.html",
})
export class OrderSpentReportComponent extends PagedListingComponentBase<OrderDto> {
  orders: OrderDto[] = [];
  keyword = "";
  isActive: boolean | null;
  workingDays: Date[] = [];
  totalSales: number = 0;
  selectedFiltered: "day" | "month" | "year" = "year";
  totalSalesForSelectedDay: number = 0;
  salesData: SalesData[] = [];
  totalSalesDto: TotalSalesDto[] = [];

  constructor(injector: Injector, private _orderService: OrderServiceProxy) {
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
      .subscribe((result: OrderDtoPagedResultDto) => {
        this.orders = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  getTotalSales(dateFrom: Date, dateTo: Date) {
    const momentDateFrom = moment(dateFrom);
    const momentDateTo = moment(dateTo);

    this._orderService
      .getTotalPurchase(momentDateFrom, momentDateTo)
      .subscribe((totalSales) => {
        console.log("Total Sales:", totalSales);
        this.totalSales = totalSales;
      });
  }

  computeWorkingDays(DateFrom: Date, DateTo: Date) {
    this.workingDays = [];
    const currentDate = new Date(DateFrom);

    while (currentDate <= DateTo) {
      if (this.isWorkingDay(currentDate)) {
        this.workingDays.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  isWorkingDay(date: Date): boolean {
    return date.getDay() !== 0 && date.getDay() !== 6;
  }

  dateFilter() {
    const today = new Date();
    let startDate: Date, endDate: Date;

    switch (this.selectedFiltered) {
      case "day":
        startDate = moment(today).startOf("month").toDate();
        endDate = moment(today).endOf("month").toDate();
        this.computeWorkingDays(startDate, endDate);
        this.getTotalSales(startDate, endDate);
        this.getDailyPurchase();
        break;
      case "month":
        startDate = moment(today).startOf("year").toDate();
        endDate = today;
        this.computeWorkingDays(startDate, endDate);
        this.getTotalSales(startDate, endDate);
        this.getMonthlyPurchase();
        break;
      case "year":
        startDate = moment(today).startOf("year").toDate();
        endDate = today;
        this.computeWorkingDays(startDate, endDate);
        this.getTotalSales(startDate, endDate);
        this.getYearlyPurchase();
    }
  }

  getMonthName(month: number): string {
    return moment()
      .month(month - 1)
      .format("MMMM");
  }

  getMonthlyPurchase(){
    this._orderService.getMonthlyPurchase().subscribe((monthlyPurchase) =>{
      this.totalSalesDto = monthlyPurchase;
    })
  }

  getYearlyPurchase(){
    this._orderService.getYearlyPurchase().subscribe((yearlyPurchase) =>{
      this.totalSalesDto = yearlyPurchase;
    })
  }

  getDailyPurchase(){
    this._orderService.getDailyPurchase().subscribe((dailyPurchase) =>{
      this.totalSalesDto = dailyPurchase;
    })
  }
}
