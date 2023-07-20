import { Component, Injector } from "@angular/core";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  OrderServiceProxy,
  OrderStatusDto,
  OrderStatusDtoPagedResultDto,
  OrderStatusServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { finalize } from "rxjs";
import { CreateEditOrderStatusModalComponent } from "./create-edit-order-status-modal/create-edit-order-status-modal.component";

class PagedOrderStatusesRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: "order-status-component",
  templateUrl: "./order-status.component.html",
  animations: [appModuleAnimation()],
})
export class OrderStatusesComponent extends PagedListingComponentBase<OrderStatusDto> {
  orderStatuses: OrderStatusDto[] = [];
  id: number;
  keyword = "";
  isActive: boolean | null;

  constructor(
    injector: Injector,
    private _orderStatusService: OrderStatusServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  protected list(
    request: PagedOrderStatusesRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._orderStatusService
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
      .subscribe((result: OrderStatusDtoPagedResultDto) => {
        this.orderStatuses = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  createOrderStatus(): void {}

  editOrderStatus(): void {}

  protected delete(orderStatus: OrderStatusDto): void {
    abp.message.confirm(
      this.l("DivisionDeleteWarningMessage", orderStatus.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._orderStatusService.delete(orderStatus.id).subscribe(() => {
            abp.notify.success(this.l("SuccessfullyDeleted"));
            this.refresh();
          });
        }
      }
    );
  }

  private showCreateOrEditDivisionModal(id?: number): void {
    let createOrEditOrderStatusModal: BsModalRef;

    if (!id) {
      createOrEditOrderStatusModal = this._modalService.show(
        CreateEditOrderStatusModalComponent,
        {
          class: "modal-lg",
        }
      );
    } else {
        createOrEditOrderStatusModal = this._modalService.show(
            CreateEditOrderStatusModalComponent,
            {
              class: "modal-lg",
              initialState:{
                id:id,
              },
            }
          );
    }
  }
}
