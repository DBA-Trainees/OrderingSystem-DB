import { Component, OnInit, } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    selector: 'create-edit-order-status-modal',
    templateUrl: 'create-edit-order-status-modal.component.html'
})


export class CreateEditOrderStatusModalComponent
extends AppComponentBase
implements OnInit{

    id: number = null;

    ngOnInit(): void {
        
    }
}