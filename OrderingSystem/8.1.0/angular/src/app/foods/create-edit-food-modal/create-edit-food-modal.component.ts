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
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "create-edit-food-modal",
  templateUrl: "create-edit-food-modal.component.html",
  styleUrls: ['../../../shared/styles/main.css']
})
export class CreateEditFoodModalComponent extends AppComponentBase implements OnInit {

  foodSizes = [
    { id: 1, name: 'Regular' },
    { id: 2, name: 'Medium' },
    { id: 3, name: 'Large' }
  ];
  saving = false;
  food = new FoodDto();
  types: TypeDto[] = [];
  categories: CategoryDto[] = [];
  id: number = 0;
  selectedCategory: number = null;
  selectedType: number = null;
  selectedSize: string = null;
  checkAllSize: boolean;

  @Output() onSave = new EventEmitter<any>();
  base64textString: string;
  base64Image: string;
  base64ImagePath: string;
  imageTypeExtension: string;

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _foodService: FoodServiceProxy,
    private _categoryService: CategoryServiceProxy,
    private _typeService: TypeServiceProxy,
    /* private http: HttpClient */
  ) {
    super(injector);
  }

  ngOnInit() {
    this.base64ImagePath = "";

    if (this.id) {
      this._foodService.get(this.id).subscribe((res) => {
        this.food = res;
        this.selectedCategory = res.categoryId;
        this.selectedType = res.typeId;
      });
    }

    this._categoryService.getAllFoodCategories().subscribe((res) => {
      this.categories = res;
    });

    this._typeService.getAllFoodTypes().subscribe((res) => {
      this.types = res;
    });
  }

  save(): void {
    this.saving = true;
    const isBase64Encoded = this.food.image.startsWith('data:image');

    if (!isBase64Encoded) {
      const reader = new FileReader();
      reader.onload = () => {
        this.base64textString = reader.result as string;
        this.food.image = this.base64textString.split(',')[1];
        this.saveFood();
      };
      const blob = new Blob([this.food.image], { type: 'data/image' });
      reader.readAsDataURL(blob);
    } else {
      this.saveFood();
    }
  }

  saveFood(): void {
    this.food.categoryId = this.selectedCategory;
    this.food.typeId = this.selectedType;
    this.food.size = this.selectedSize;

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