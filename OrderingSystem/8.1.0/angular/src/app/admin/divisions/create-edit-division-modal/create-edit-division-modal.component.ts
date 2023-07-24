import { Component, EventEmitter, Injector, OnInit, Output } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  DivisionDto,
  DivisionServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "create-edit-division-modal",
  templateUrl: "create-edit-division-modal.component.html",
  styleUrls : ['../../../../shared/styles/main.css']
})
export class CreateEditDivisionModalComponent
  extends AppComponentBase
  implements OnInit
{
  saving = false;
  division = new DivisionDto();
  id: number = 0;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _divisionService: DivisionServiceProxy
  ) {
    super(injector);
  }

  ngOnInit() {
    if (this.id) {
      this._divisionService.get(this.id).subscribe((res) => {
        this.division = res;
      });
    }
  }

  save(): void {
    this.saving = true;

    if (this.id != 0) {
      this._divisionService.update(this.division).subscribe(
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
      this._divisionService.create(this.division).subscribe(
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
