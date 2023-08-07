import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CartDto, CartServiceProxy, OrderDto, OrderServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'order-component',
    templateUrl: 'order.component.html',
    styleUrls: ["./order.component.css"]
})


export class OrdersComponent 
extends AppComponentBase
implements OnInit{
    saving: boolean = false;
    id: number;
    order = new OrderDto;
    cart = new CartDto;

    constructor(
        injector: Injector,
        public bsModalRef: BsModalRef,
        private _cartService: CartServiceProxy,
        private _orderService: OrderServiceProxy
    ){
        super(injector);
    }

    ngOnInit(): void {
        if(this.id >0){
            this._orderService.get(this.id).subscribe((res) =>{
                this.order = res;
            });
        }
    }

    checkOutOrder(): void{

    }

}