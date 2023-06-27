import { Component, EventEmitter, Injector, OnInit, Output } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { TypeDto, TypeServiceProxy } from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
    selector: "create-edit-type-modal",
    templateUrl: "create-edit-type-modal.component.html",
    styleUrls : ['../../../shared/styles/main.css']
  })

  export class CreateEditTypeModalComponent
    extends AppComponentBase
    implements OnInit
  {
    saving = false;
    type: TypeDto = new TypeDto();
    id: number = 0;

    @Output() onSave = new EventEmitter<any>();

    constructor(
      injector: Injector,
      private _typeService: TypeServiceProxy,
      public bsModalRef: BsModalRef
    ) {
      super(injector);
    }

    ngOnInit() {
      if (this.id) {
        this._typeService.get(this.id).subscribe((res) => {
          this.type = res;
        });
      }
    }

    save(): void {
      this.saving = true;

      if (this.id !== 0) {
        this._typeService.update(this.type).subscribe(
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
        this._typeService.create(this.type).subscribe(
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