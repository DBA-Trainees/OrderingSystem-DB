import { Component, Injector } from "@angular/core";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
    CustomerDto,
  CustomerDtoPagedResultDto,
  CustomerServiceProxy
} from "@shared/service-proxies/service-proxies";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { finalize } from "rxjs/operators";
import { CreateEditCustomerModalComponent } from "./create-edit-customer-modal/create-edit-customer-modal.component";

class PagedCustomersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: "customers-component",
  templateUrl: "customers.component.html",
  styleUrls : ['../../../shared/styles/main.css'],
  animations: [appModuleAnimation()],
})
export class CustomersComponent extends PagedListingComponentBase<CustomerDto> {
  customers: CustomerDto[] = [];
  keyword = "";
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _customerService: CustomerServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createCustomer(): void {
    this.showCreateOrEditCustomerModal();
  }

  editCustomer(id): void {
    this.showCreateOrEditCustomerModal(id);
  }

  protected list(
    request: PagedCustomersRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._customerService
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
      .subscribe((result: CustomerDtoPagedResultDto) => {
        this.customers = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(customer: CustomerDto): void {
    abp.message.confirm(
      this.l("CustomerDeleteWarningMessage", customer.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._customerService.delete(customer.id).subscribe(() => {
            abp.notify.success(this.l("SuccessfullyDeleted"));
            this.refresh();
          });
        }
      }
    );
  }

  private showCreateOrEditCustomerModal(id?: number): void{
    let createOrEditCustomerModal: BsModalRef;
    if(!id){
      createOrEditCustomerModal = this._modalService.show(
        CreateEditCustomerModalComponent,
        {
          class: 'modal-lg',
        }
      );
    }else{
      createOrEditCustomerModal = this._modalService.show(
        CreateEditCustomerModalComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditCustomerModal.content.onSave.subscribe(() =>{
      this.refresh();
    })
  }
}
