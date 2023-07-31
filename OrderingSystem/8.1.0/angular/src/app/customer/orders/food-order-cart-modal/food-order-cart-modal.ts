import { ChangeDetectionStrategy, Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    selector: 'food-order-cart-footer',
    templateUrl: 'food-order-cart-modal.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})


export class FoodOrderCartModalFooterComponent extends AppComponentBase {
    @Input() cancelLabel = this.l('Cancel');
    @Input() cancelDisabled: boolean;
    @Input() saveLabel = this.l('Add To Cart');
    @Input() saveDisabled: boolean;

    @Output() onCancelClick = new EventEmitter<number>();

    constructor(injector: Injector) {
        super(injector);
    }
}