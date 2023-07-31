import { ChangeDetectionStrategy, Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    selector: 'food-order-proceed-footer',
    templateUrl: 'food-order-proceed-modal.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})


export class FoodOrderProceedModalFooterComponent extends AppComponentBase {
    @Input() cancelLabel = this.l('Cancel');
    @Input() cancelDisabled: boolean;
    @Input() saveLabel = this.l('Proceed Order');
    @Input() saveDisabled: boolean;

    @Output() onCancelClick = new EventEmitter<number>();

    constructor(injector: Injector) {
        super(injector);
    }
}