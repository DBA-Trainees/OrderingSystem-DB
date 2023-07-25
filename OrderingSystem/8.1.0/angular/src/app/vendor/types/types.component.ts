import { Component, Injector } from "@angular/core";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  TypeDto,
  TypeDtoPagedResultDto,
  TypeServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { finalize } from "rxjs/operators";
import { CreateEditTypeModalComponent } from "./create-edit-type-modal/create-edit-type-modal.component";

class PagedTypesRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: "types-component",
  templateUrl: "types.component.html",
  styleUrls: ["../../../shared/styles/main.css"],
  animations: [appModuleAnimation()],
})
export class TypesComponent extends PagedListingComponentBase<TypeDto> {
  types: TypeDto[] = [];
  keyword = "";
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _typeService: TypeServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createType(): void {
    this.showCreateOrEditTypeModal();
  }

  editType(id): void {
    this.showCreateOrEditTypeModal(id);
  }

  protected list(
    request: PagedTypesRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._typeService
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
      .subscribe((result: TypeDtoPagedResultDto) => {
        this.types = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(type: TypeDto): void {
    abp.message.confirm(
      this.l("CategoryDeleteWarningMessage", type.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._typeService.delete(type.id).subscribe(() => {
            abp.notify.success(this.l("SuccessfullyDeleted"));
            this.refresh();
          });
        }
      }
    );
  }

  private showCreateOrEditTypeModal(id?: number): void {
    let createOrEditTypeModal: BsModalRef;
    if (!id) {
        createOrEditTypeModal = this._modalService.show(
            CreateEditTypeModalComponent,
        {
          class: "modal-lg",
        }
      );
    } else {
        createOrEditTypeModal = this._modalService.show(
            CreateEditTypeModalComponent,
        {
          class: "modal-lg",
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditTypeModal.content.onSave.subscribe(() =>{
        this.refresh();
    })
  }

}
