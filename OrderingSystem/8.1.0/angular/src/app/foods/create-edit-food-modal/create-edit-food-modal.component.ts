import { Component, EventEmitter, Injector, OnInit, Output } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  CategoryDto,
  CategoryServiceProxy,
  FoodDto,
  FoodServiceProxy,
  TypeDto,
  TypeServiceProxy
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "create-edit-food-modal",
  templateUrl: "create-edit-food-modal.component.html",
  styleUrls: ['../../../shared/styles/main.css']
})
export class CreateEditFoodModalComponent extends AppComponentBase implements OnInit {

  foodSizes=[
    {id: 1, value:"Regular"},
    {id: 2, value:"Medium"},
    {id: 3, value:"Large"}
  ];
  saving = false;
  food = new FoodDto();
  types: TypeDto[] = [];
  categories: CategoryDto[] = []; 
  id: number = 0;
  selectedCategory: number = null;
  selectedType: number = null;
  selectedSize: string[] =[];
  isAvailable: boolean= true;

  @Output() onSave = new EventEmitter<any>();
  base64ImagePath: string;

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _foodService: FoodServiceProxy,
    private _categoryService: CategoryServiceProxy,
    private _typeService: TypeServiceProxy
  ) {
    super(injector);
  }

  ngOnInit() {

    if (this.id) {
      this._foodService.get(this.id).subscribe((res) => {
        this.food = res;
        this.selectedCategory = res.categoryId;
        this.selectedType = res.typeId;
        this.selectedSize = res.size ? res.size.split(", ") : [];
        /* this.food.price = parseFloat(res.price); */
      });
    }

    this._categoryService.getAllFoodCategories().subscribe((res) => {
      this.categories = res;
    });

    this._typeService.getAllFoodTypes().subscribe((res) => {
      this.types = res;
    });
  }

  displayImage(event: any): void{
    const foodFile = event.target.files[0];
    const foodFileName = foodFile.name;
  
    const fileNameWithoutExtension = foodFileName.split('.').slice(0, -1).join('.');
    const fileTypeOnly = foodFileName.split('.').pop();
  
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const base64String = e.target.result.split(',')[1];
      this.food.image = base64String;
      this.food.imageFileType = fileTypeOnly;
      this.food.imageName = fileNameWithoutExtension;
    };
    reader.readAsDataURL(foodFile);
  }

  isFoodAvailable(event: any): void{
    this.isAvailable = event.target.checked;
  }

  isFoodSizeChecked(size: string): boolean {
    return this.selectedSize.includes(size);
  }

  onFoodSizeChanged(size: string, checked: boolean): void {
    if (checked) {
      if (!this.selectedSize.includes(size)) {
        this.selectedSize.push(size);
      }
    } else {
      const index = this.selectedSize.indexOf(size);
      if (index !== -1) {
        this.selectedSize.splice(index, 1);
      }
    }
  }

  save(): void {
    this.saving = true;
    this.food.categoryId = this.selectedCategory;
    this.food.typeId = this.selectedType;
    this.food.size = this.selectedSize.join(", ");

    if (this.id !== 0) {
      this._foodService.update(this.food).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully'));
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
          this.notify.info(this.l('SavedSuccessfully'));
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