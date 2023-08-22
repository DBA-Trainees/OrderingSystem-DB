import { Component, Injector, OnInit } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  PagedRequestDto
} from "@shared/paged-listing-component-base";
import {
  OrderDto,
  OrderServiceProxy,
  TotalSalesDto,
} from "@shared/service-proxies/service-proxies";
import * as moment from "moment/moment";

class PagedOrdersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

class SalesData {
  dateTimeOrdered: string;
  totalAmount: number;
}

@Component({
  selector: "sales-report",
  templateUrl: "reports.component.html",
  styleUrls: ["./reports.component.css"],
})
export class ReportsComponent extends AppComponentBase implements OnInit {
  workingDays: Date[] = [];
  totalSales: number = 0;
  selectedFiltered: "day" | "month" | "year" = "year";
  orders: OrderDto[] = [];
  totalSalesForSelectedDay: number = 0;
  salesData: SalesData[] =[]; 
  totalSalesDto: TotalSalesDto[]=[];
  today = new Date();

  constructor(
    injector: Injector,
    private _orderService: OrderServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.dateFilter();
  }

  getMonthName(month: number):string{
    return moment().month(month - 1).format('MMMM');
  }

  getTotalSales(dateFrom: Date, dateTo: Date) {
    const momentDateFrom = moment(dateFrom);
    const momentDateTo = moment(dateTo);
  
    this._orderService.getTotalSales(momentDateFrom, momentDateTo).subscribe((totalSales) => {
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

  getSalesPerDay(day: Date): number {
    const salesDataForDay = this.salesData.find(data => moment(data.dateTimeOrdered).isSame(day, 'day'));
    return salesDataForDay ? salesDataForDay.totalAmount : 0;
  }  

  getTotalSalesPerDay(){
    this._orderService.getDailyTotalSales().subscribe((salesPerDay) =>{
      this.totalSalesDto = salesPerDay;
    })
  }

  getTotalSalesPerMonth(){
    this._orderService.getMonthlyTotalSales().subscribe((salesPerMonth) =>{
      this.totalSalesDto = salesPerMonth;
    })
  }

  getTotalSalesPerYear(){
    this._orderService.getYearlyTotalSales().subscribe((salesPerYear) =>{
      this.totalSalesDto = salesPerYear;
    })
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
        this.getTotalSalesPerDay();
        break;
      case 'month':
        startDate = moment(today).startOf('year').toDate();
        endDate = today;
        this.computeWorkingDays(startDate, endDate);
        this.getTotalSales(startDate, endDate);
        this.getTotalSalesPerMonth();
        break;
      case 'year':
        startDate = moment(today).startOf('year').toDate();
        endDate = today;
        this.computeWorkingDays(startDate, endDate);
        this.getTotalSales(startDate, endDate);
        this.getTotalSalesPerYear();
        break;
    }
  }
}