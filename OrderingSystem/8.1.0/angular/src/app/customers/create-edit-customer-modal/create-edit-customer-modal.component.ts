import { Component, EventEmitter, Injector, OnInit, Output } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
    CustomerDto,
  CustomerServiceProxy,
  DivisionDto,
  DivisionServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "create-edit-customer-modal",
  templateUrl: "create-edit-customer-modal.component.html",
})
export class CreateEditCustomerModalComponent
  extends AppComponentBase
  implements OnInit
{
  saving = false;
  customer: CustomerDto = new CustomerDto();
  id: number = 0;
  divisions: DivisionDto[] =[];
  selectedDivision: number = null;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _customerService: CustomerServiceProxy,
    private _divisionService : DivisionServiceProxy
  ) {
    super(injector);
  }

  ngOnInit() {
    if (this.id) {
      this._customerService.get(this.id).subscribe((res) => {
        this.customer = res;
        this.selectedDivision = this.customer.divisionId;
      });
    }
    this._divisionService.getAllDivisions().subscribe((res) =>{
        this.divisions = res;
    })
  }

  save(): void {
    this.saving = true;
    this.customer.divisionId = this.selectedDivision;
    if (this.id !== 0) {
      this._customerService.update(this.customer).subscribe(
        () => {
          this.notify.info(this.l("SavedSuccessfully"));
          this.bsModalRef.hide();
          this.onSave.emit();
        },
        () => {
          this.saving = false;
        }
      );
    } else {
      this._customerService.create(this.customer).subscribe(
        () => {
          this.notify.info(this.l("SavedSuccessfully"));
          this.bsModalRef.hide();
          this.onSave.emit();
        },
        () => {
          this.saving = false;
        }
      );
    }
  }
}