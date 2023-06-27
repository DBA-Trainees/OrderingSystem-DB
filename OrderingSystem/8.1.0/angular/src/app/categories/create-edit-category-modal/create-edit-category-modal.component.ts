import { Component, EventEmitter, Injector, OnInit, Output } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { CategoryDto, CategoryServiceProxy } from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
    selector: "create-edit-catebory-modal",
    templateUrl: "create-edit-category-modal.component.html",
    styleUrls : ['../../../shared/styles/main.css']
  })

  export class CreateEditCategoryModalComponent
    extends AppComponentBase
    implements OnInit
  {
    saving = false;
    category: CategoryDto = new CategoryDto();
    id: number = 0;

    @Output() onSave = new EventEmitter<any>();

    constructor(
      injector: Injector,
      private _categoryService: CategoryServiceProxy,
      public bsModalRef: BsModalRef
    ) {
      super(injector);
    }

    ngOnInit() {
      if (this.id) {
        this._categoryService.get(this.id).subscribe((res) => {
          this.category = res;
        });
      }
    }

    save(): void {
      this.saving = true;

      if (this.id !== 0) {
        this._categoryService.update(this.category).subscribe(
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
        this._categoryService.create(this.category).subscribe(
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