import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from 'app/roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { DivisionsComponent } from './divisions/divisions.component';
import { CustomersComponent } from './customers/customers.component';
import { CategoriesComponent } from './categories/categories.component';
import { TypesComponent } from './types/types.component';
import { FoodsComponent } from './foods/foods.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'about', component: AboutComponent, canActivate: [AppRouteGuard] },
                    { path: 'update-password', component: ChangePasswordComponent, canActivate: [AppRouteGuard] },
                    { path: 'divisions', component: DivisionsComponent, data: { permission: 'Pages.Divisions' }, canActivate: [AppRouteGuard] },
                    { path: 'customers', component: CustomersComponent, data: { permission: 'Pages.Customers' }, canActivate: [AppRouteGuard] },
                    { path: 'categories', component: CategoriesComponent, data: { permission: 'Pages.Categories' }, canActivate: [AppRouteGuard] },
                    { path: 'types', component: TypesComponent, data: { permission: 'Pages.Types' }, canActivate: [AppRouteGuard] },
                    { path: 'foods', component: FoodsComponent, data: { permission: 'Pages.Types' },canActivate: [AppRouteGuard] },
                    { path: 'orders', component: OrdersComponent, canActivate: [AppRouteGuard] },
                
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
