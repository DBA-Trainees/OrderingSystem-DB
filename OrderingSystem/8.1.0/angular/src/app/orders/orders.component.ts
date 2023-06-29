import { Component, Injector } from "@angular/core";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  OrderDto,
  OrderDtoPagedResultDto,
  OrderServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { finalize } from "rxjs/operators";
import { CreateEditOrderModalComponent } from "./create-edit-order-modal/create-edit-order-modal.component";

class PagedOrdersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: "orders-component",
  templateUrl: "orders.component.html",
  styleUrls: ["../../shared/styles/main.css"],
  animations: [appModuleAnimation()],
})
export class OrdersComponent extends PagedListingComponentBase<OrderDto> {
  orders: OrderDto[] = [];
  keyword = "";
  isActive: boolean | null;
  advancedFiltersVisible = false;

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

  createOrder(): void {
    this.showCreateOrEditOrderModal();
  }

  editOrder(id): void {
    this.showCreateOrEditOrderModal(id);
  }

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

  private showCreateOrEditOrderModal(id?: number): void{
    let createOrEditOrderDialog: BsModalRef;
    if(!id){
        createOrEditOrderDialog = this._modalService.show(
        CreateEditOrderModalComponent,
        {
          class: 'modal-lg',
        }
      );
    }else{
        createOrEditOrderDialog = this._modalService.show(
            CreateEditOrderModalComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditOrderDialog.content.onSave.subscribe(() =>{
      this.refresh();
    })
  }
}
