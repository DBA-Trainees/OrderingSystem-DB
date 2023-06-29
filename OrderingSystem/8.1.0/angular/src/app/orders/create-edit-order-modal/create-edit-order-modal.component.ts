import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
} from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  CustomerDto,
  CustomerServiceProxy,
  FoodDto,
  FoodServiceProxy,
  OrderDto,
  OrderServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "create-edit-order-modal",
  templateUrl: "create-edit-order-modal.component.html",
})
export class CreateEditOrderModalComponent
  extends AppComponentBase
  implements OnInit
{
  saving = false;
  order: OrderDto = new OrderDto();
  id: number = 0;
  foods: FoodDto[] = [];
  customers: CustomerDto[] = [];
  selectedFood: number = null;
  selectedCustomer: number = null;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _orderService: OrderServiceProxy,
    private _foodService: FoodServiceProxy,
    private _customerService: CustomerServiceProxy
  ) {
    super(injector);
  }
  ngOnInit() {
    if(this.id){
        this._orderService.get(this.id).subscribe((res) =>{
            this.order = res;
            this.selectedCustomer = this.order.customerId;
            this.selectedFood = this.order.foodId;
        })
    }
    this._foodService.getAllFoods().subscribe((res) =>{
        this.foods = res;
    })
  }

  save(): void {
    this.saving = true;
    this.order.foodId = this.selectedFood;
    this.order.customerId = this.selectedCustomer;

    if (this.id !== 0) {
      this._orderService.update(this.order).subscribe(
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
      this._orderService.create(this.order).subscribe(
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
