import { Component, Injector } from "@angular/core";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  DivisionDto,
  DivisionDtoPagedResultDto,
  DivisionServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { finalize } from "rxjs/operators";
import { CreateEditDivisionModalComponent } from "./create-edit-division-modal/create-edit-division-modal.component";

class PagedDivisionsRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: "divisions-component",
  templateUrl: "divisions.component.html",
  animations: [appModuleAnimation()],
})
export class DivisionsComponent extends PagedListingComponentBase<DivisionDto> {
  divisions: DivisionDto[] = [];
  keyword = "";
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _divisionService: DivisionServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createDivision(): void {
    this.showCreateOrEditDivisionDialog();
  }

  editDivision(id): void {
    this.showCreateOrEditDivisionDialog(id);
  }

  protected list(
    request: PagedDivisionsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._divisionService
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
      .subscribe((result: DivisionDtoPagedResultDto) => {
        this.divisions = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(division: DivisionDto): void {
    abp.message.confirm(
      this.l("DivisionDeleteWarningMessage", division.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._divisionService.delete(division.id).subscribe(() => {
            abp.notify.success(this.l("SuccessfullyDeleted"));
            this.refresh();
          });
        }
      }
    );
  }

  private showCreateOrEditDivisionDialog(id?: number): void{
    let createOrEditDivisionDialog: BsModalRef;
    if(!id){
      createOrEditDivisionDialog = this._modalService.show(
        CreateEditDivisionModalComponent,
        {
          class: 'modal-lg',
        }
      );
    }else{
      createOrEditDivisionDialog = this._modalService.show(
        CreateEditDivisionModalComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditDivisionDialog.content.onSave.subscribe(() =>{
      this.refresh();
    })
  }
}
