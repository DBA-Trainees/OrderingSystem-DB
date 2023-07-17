import { Component, Injector, OnInit } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { OrderDto } from "@shared/service-proxies/service-proxies";

@Component({
    templateUrl: './view-order.component.html'
})

export class ViewOrdersComponent
extends AppComponentBase implements OnInit{

order = new OrderDto();

constructor(
    injector: Injector
){
    super(injector);
}

ngOnInit(): void {
}
}