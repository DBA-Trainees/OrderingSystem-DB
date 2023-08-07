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
import { DivisionsComponent } from './admin/divisions/divisions.component';
import { CustomersComponent } from './admin/customers/customers.component';
import { CategoriesComponent } from './vendor/categories/categories.component';
import { TypesComponent } from './vendor/types/types.component';
import { FoodsComponent } from './vendor/foods/foods.component';
import { AddToCartsComponent } from './customer/carts/carts.component';
import { OrderSpentReportComponent } from './customer/order-spent-report/order-spent-report.component';
import { PurchaseHistoryComponent } from './customer/purchase-history/purchase-history.component';
import { ReportsComponent } from './vendor/reports/reports.component';
import { FoodListComponent } from './customer/food-list/food-list.component';
import { FoodDetailsComponent } from './customer/food-list/food-details/food-details.component';
import { ViewOrdersComponent } from './vendor/view-order/view-order.component';
import { OrderStatusesComponent } from './order-status/order-status.component';
import { OrdersComponent } from './customer/orders/order.component';
import { DashboardComponent } from './dashboard/dashboard';

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
                    { path: 'admin/divisions', component: DivisionsComponent, data: { permission: 'Pages.Admin.Divisions' }, canActivate: [AppRouteGuard] },
                    { path: 'admin/customers', component: CustomersComponent, data: { permission: 'Pages.Admin.Customers' }, canActivate: [AppRouteGuard] },
                    { path: 'vendor/categories', component: CategoriesComponent, data: { permission: 'Pages.Vendor.Categories' }, canActivate: [AppRouteGuard] },
                    { path: 'vendor/types', component: TypesComponent, data: { permission: 'Pages.Vendor.Types' }, canActivate: [AppRouteGuard] },
                    { path: 'vendor/foods', component: FoodsComponent, data: { permission: 'Pages.Vendor.Foods' },canActivate: [AppRouteGuard]},
                    { path: 'customer/carts', component: AddToCartsComponent, data: { permission: 'Pages.Customer.Carts' }, canActivate: [AppRouteGuard] },
                    { path: 'vendor/view-order', component: ViewOrdersComponent, data: { permission: 'Pages.Vendor.ViewOrders' }, canActivate: [AppRouteGuard] },
                    { path: 'customer/order-spent-report', component: OrderSpentReportComponent, data: { permission: 'Pages.Customer.OrderSpentReport' }, canActivate: [AppRouteGuard] },
                    { path: 'customer/food-list', component: FoodListComponent, data: { permission: 'Pages.Customer.FoodList' }, canActivate: [AppRouteGuard] },
                    { path: 'customer/purchase-history', component: PurchaseHistoryComponent, data: { permission: 'Pages.Customer.PurchaseHistory' }, canActivate: [AppRouteGuard] },
                    { path: 'vendor/reports', component: ReportsComponent, data: { permission: 'Pages.Vendor.SalesReports' }, canActivate: [AppRouteGuard] },
                    { path: 'vendor/food-list/food-details', component: FoodDetailsComponent, data: { permission: 'Pages.Vendor.FoodDetails' },canActivate: [AppRouteGuard] },
                    { path: 'order-status', component: OrderStatusesComponent ,canActivate: [AppRouteGuard] },
                    { path: 'customer/orders', component: OrdersComponent ,canActivate: [AppRouteGuard] },
                    { path: 'dashboard', component: DashboardComponent ,canActivate: [AppRouteGuard] },
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
