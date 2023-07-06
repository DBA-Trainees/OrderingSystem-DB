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
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { AddToCartsComponent } from './carts/carts.component';
import { OrderSpentReportComponent } from './order-spent-report/order-spent-report.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { ReportsComponent } from './reports/reports.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

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
                    { path: 'foods', component: FoodsComponent, data: { permission: 'Pages.Foods' },canActivate: [AppRouteGuard] },
                    { path: 'view-orders', component: ViewOrdersComponent, data: { permission: 'Pages.ViewOrders' },canActivate: [AppRouteGuard] },
                    { path: 'carts', component: AddToCartsComponent, data: { permission: 'Pages.AddToCart' }, canActivate: [AppRouteGuard] },
                    { path: 'order-spent-report', component: OrderSpentReportComponent, data: { permission: 'Pages.OrderSpentReport' }, canActivate: [AppRouteGuard] },
                    { path: 'order-list', component: OrderListComponent, data: { permission: 'Pages.OrderList' }, canActivate: [AppRouteGuard] },
                    { path: 'purchase-history', component: PurchaseHistoryComponent, data: { permission: 'Pages.PurchaseHistory' }, canActivate: [AppRouteGuard] },
                    { path: 'reports', component: ReportsComponent, data: { permission: 'Pages.SalesReports' }, canActivate: [AppRouteGuard] },
                    { path: 'order-details', component: OrderDetailsComponent, canActivate: [AppRouteGuard] },
                
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
