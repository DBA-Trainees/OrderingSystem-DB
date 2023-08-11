import { Component, Injector, OnInit } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  OrderDto,
  OrderDtoPagedResultDto,
  OrderServiceProxy,
} from "@shared/service-proxies/service-proxies";
import * as moment from "moment/moment";
import { BsModalService } from "ngx-bootstrap/modal";
import { finalize } from "rxjs/operators";

class PagedOrdersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: "sales-report",
  templateUrl: "reports.component.html",
  styleUrls: ["./reports.component.css"],
})
export class ReportsComponent extends AppComponentBase implements OnInit {
  orders: OrderDto[] = [];
  order = new OrderDto();
  keyword = "";
  isActive: boolean | null;
  workingDays: Date[] = [];
  totalSales: number = 0;
  selectedFiltered: "day" | "month" | "year" = "year";
  salesData: any[] = [];

  constructor(
    injector: Injector,
    private _orderService: OrderServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  ngOnInit(): void {}

  getTotalSales() {
    const dateFrom = moment().startOf(this.selectedFiltered).local().toDate();
    const dateTo = moment().endOf(this.selectedFiltered).local().toDate();

    this.getSalesForPeriod(dateFrom, dateTo).subscribe((salesData) =>{
      /* this.salesData = salesData;
      this.totalSales = this.calculateTotalSales(this.totalSales); */
    })
   /*  this.get

    this.computeWeekDays(DateFrom, DateTo);

    this._orderService.getTotalSales(moment(DateFrom), moment(DateTo)).subscribe((totalSales) =>{
      this.totalSales = totalSales;
    }) */
  }

  getSalesForPeriod(dateFrom: Date, dateTo: Date){
    return this._orderService.getTotalSales(moment(dateFrom), moment(dateTo));
  }

  calculateTotalSales(salesData: any[]): number{
    return salesData.reduce((total, data) => total + data.totalAmount, 0);
  }

  computeWeekDays(DateFrom: Date, DateTo: Date) {
    this.workingDays = [];
    const currentDate = new Date(DateFrom);

    while (currentDate <= DateTo) {
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        this.workingDays.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() +1);
    }
  }

  getSalesPerDay(day: Date): number{
    return 0;
  }

  dateFilter(){
    this.getTotalSales();
  }

  /* protected list(
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
      } */
}
