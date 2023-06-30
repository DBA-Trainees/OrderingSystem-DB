import { Component, EventEmitter, Injector, OnInit, Output } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { 
  CategoryDto, 
  CategoryServiceProxy, 
  FoodDto, 
  FoodServiceProxy, 
  TypeDto, TypeServiceProxy } from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
    selector: "create-edit-food-modal",
    templateUrl: "create-edit-food-modal.component.html",
    styleUrls : ['../../../shared/styles/main.css']
  })

  export class CreateEditFoodModalComponent
    extends AppComponentBase
    implements OnInit
  {
    saving = false;
    food : FoodDto = new FoodDto();
    types: TypeDto[] = [];
    categories: CategoryDto[] = [];
    id: number = 0;
    selectedCategory:number = null;
    selectedType:number = null;

    @Output() onSave = new EventEmitter<any>();
    base64textString: string;

    constructor(
      injector: Injector,
      public bsModalRef: BsModalRef,
      private _foodService: FoodServiceProxy,
      private _categoryService: CategoryServiceProxy,
      private _typeService: TypeServiceProxy
    ){
      super(injector)
    }

  ngOnInit() {
    if (this.id) {
      this._foodService.get(this.id).subscribe((res) => {
        this.food = res;
        this.selectedCategory = res.categoryId;
        this.selectedType = res.typeId;
      });
    }
    this._categoryService.getAllFoodCategories().subscribe((res) =>{
      this.categories = res;
    });
    this._typeService.getAllFoodTypes().subscribe((res) =>{
      this.types = res;
    });
  }

  /* convertToBlob(dataURI: string): Blob{
    const [contentType, base64Data] = dataURI.split(',');
    const byteString = atob(base64Data);
    const buffer = new ArrayBuffer(byteString.length);
    const binaryArray = new Uint8Array(buffer);

    for (let i=0; i< byteString.length; i++){
      binaryArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([binaryArray], {type: contentType});
  } */

  save(): void{
    this.saving = true;
    /* this.food.image  = this.base64textString; */
    this.food.typeId = this.selectedType;
    this.food.categoryId = this.selectedCategory;
    

    /* const reader = new FileReader();
    reader.onload = () =>{
      this.base64textString = reader.result as string;
      this.food.image  = this.base64textString; */

      if (this.id !== 0) {
        this._foodService.update(this.food).subscribe(
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
        this._foodService.create(this.food).subscribe(
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
      /* reader.readAsDataURL(this.convertToBlob(this.food.image));
    }   */
  }

  }