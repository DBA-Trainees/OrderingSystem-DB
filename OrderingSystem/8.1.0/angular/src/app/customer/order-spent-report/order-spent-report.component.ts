import { Component, Injector, OnInit } from "@angular/core";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import { OrderDto, OrderDtoPagedResultDto, OrderServiceProxy } from "@shared/service-proxies/service-proxies";
import * as moment from "moment";
import { BsModalService } from "ngx-bootstrap/modal";
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
  salesData: SalesData[] =[];

  constructor(
    injector: Injector,
    private _orderService: OrderServiceProxy
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
  
    this._orderService.getTotalPurchase(momentDateFrom, momentDateTo).subscribe((totalSales) => {
      console.log("Total Sales:", totalSales);
      this.totalSales = totalSales;
    });
  }

  calculateTotalSales(salesData: any[]): number {
    return salesData.reduce((total, data) => total + data.totalAmount, 0);
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

  getSalesPerDay(day: Date): number {
    const salesDataForDay = this.salesData.find(data => moment(data.dateTimeOrdered).isSame(day, 'day'));
    return salesDataForDay ? salesDataForDay.totalAmount : 0;
  }
  

  calculateSalesPerPeriod(periods: Date[], interval: 'day' | 'month' | 'year') {
    this.salesData = [];
  
    for (const period of periods) {
      let sales = 0;
  
      if (interval === 'day') {
        sales = this.getSalesPerDay(period);
      } else if (interval === 'year') {
        const startOfYear = moment(period).startOf('year');
        const endOfYear = moment(period).endOf('year');
        sales = this.calculateTotalSales(this.filterSalesData(startOfYear, endOfYear));        
      }
  
      this.salesData.push({
        dateTimeOrdered: moment(period).format(interval === 'month' ? 'MMMM YYYY' : 'YYYY'),
        totalAmount: sales,
      });
    }

    console.log(this.salesData);
  }
  
  

  filterSalesData(startDate: moment.Moment, endDate: moment.Moment): any[] {
    const formattedStartDate = startDate;
    const formattedEndDate = endDate;
  
    return this.salesData.filter(data =>
      moment(data.dateTimeOrdered).isBetween(formattedStartDate, formattedEndDate, null, '[]')
    );
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
        this.calculateSalesPerPeriod(this.workingDays, 'day');
        break;
      case 'month':
        startDate = moment(today).startOf('year').toDate();
        endDate = today;
        this.getTotalSales(startDate, endDate);
        this.calculateSalesPerPeriod(this.getYearMonthsRange(startDate, endDate), 'month');
        break;
      case 'year':
        startDate = moment(today).startOf('year').toDate();
        endDate = today;
        this.getTotalSales(startDate, endDate);
        this.calculateSalesPerPeriod(this.getYearsRange(startDate, endDate), 'year');
        break;
    }
  }
  

  getYearMonthsRange(dateFrom: Date, dateTo: Date): Date[] {
    const monthsRange: Date[] = [];
    const currentDate = moment(dateFrom);

    while (currentDate.isSameOrBefore(dateTo, 'month')) {
      monthsRange.push(currentDate.toDate());
      currentDate.add(1, 'month');
    }

    return monthsRange;
  }

  getYearsRange(dateFrom: Date, dateTo: Date): Date[] {
    const currentYear = moment().year();
    const yearsRange: Date[] = [];

    for (let year = currentYear; year <= moment(dateTo).year(); year++) {
      yearsRange.push(moment({ year }).toDate());
    }

    return yearsRange;
  }

  calculateTotalSalesForSelectedDay(selectedDay: Date) {
    const salesDataForSelectedDay = this.salesData.find(data =>
      moment(data.dateTimeOrdered).isSame(selectedDay, "day")
    );
    this.totalSalesForSelectedDay = salesDataForSelectedDay
      ? salesDataForSelectedDay.totalAmount
      : 0;
  }
}
