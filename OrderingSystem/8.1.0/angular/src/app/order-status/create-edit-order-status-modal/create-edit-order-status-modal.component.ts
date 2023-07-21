import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter,
} from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  OrderStatusDto,
  OrderStatusServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "create-edit-order-status-modal",
  templateUrl: "create-edit-order-status-modal.component.html",
})
export class CreateEditOrderStatusModalComponent
  extends AppComponentBase
  implements OnInit
{
  id: number = null;
  saving: boolean = false;
  orderStatus = new OrderStatusDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _orderStatusService: OrderStatusServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.id) {
      this._orderStatusService.get(this.id).subscribe((res) => {
        this.orderStatus = res;
      });
    }
  }

  save(): void {
    this.saving = true;

    if (this.id > 0) {
      this._orderStatusService.update(this.orderStatus).subscribe(
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
      this._orderStatusService.create(this.orderStatus).subscribe(
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
