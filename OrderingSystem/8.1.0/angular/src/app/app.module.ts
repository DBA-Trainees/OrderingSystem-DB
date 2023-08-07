import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
// tenants
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantDialogComponent } from './tenants/create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './tenants/edit-tenant/edit-tenant-dialog.component';
// roles
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';
// users
import { UsersComponent } from '@app/users/users.component';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from '@app/users/edit-user/edit-user-dialog.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
// layout
import { HeaderComponent } from './layout/header.component';
import { HeaderLeftNavbarComponent } from './layout/header-left-navbar.component';
import { HeaderLanguageMenuComponent } from './layout/header-language-menu.component';
import { HeaderUserMenuComponent } from './layout/header-user-menu.component';
import { FooterComponent } from './layout/footer.component';
import { SidebarComponent } from './layout/sidebar.component';
import { SidebarLogoComponent } from './layout/sidebar-logo.component';
import { SidebarUserPanelComponent } from './layout/sidebar-user-panel.component';
import { SidebarMenuComponent } from './layout/sidebar-menu.component';
import { DivisionsComponent } from './admin/divisions/divisions.component'
import { CartServiceProxy, CategoryServiceProxy, CustomerServiceProxy, DivisionServiceProxy, FoodServiceProxy, OrderServiceProxy, OrderStatusServiceProxy, TypeServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateEditDivisionModalComponent } from './admin/divisions/create-edit-division-modal/create-edit-division-modal.component'
import { CustomersComponent } from './admin/customers/customers.component'
import { CreateEditCustomerModalComponent } from './admin/customers/create-edit-customer-modal/create-edit-customer-modal.component'
import { CategoriesComponent } from './vendor/categories/categories.component'
import { CreateEditCategoryModalComponent } from './vendor/categories/create-edit-category-modal/create-edit-category-modal.component'
import { TypesComponent } from './vendor/types/types.component'
import { CreateEditTypeModalComponent } from './vendor/types/create-edit-type-modal/create-edit-type-modal.component'
import { FoodsComponent } from './vendor/foods/foods.component'
import { CreateEditFoodModalComponent } from './vendor/foods/create-edit-food-modal/create-edit-food-modal.component'
import { ReportsComponent } from './vendor/reports/reports.component'
import { AddToCartsComponent } from './customer/carts/carts.component'
import { FoodListComponent } from './customer/food-list/food-list.component'
import { PurchaseHistoryComponent } from './customer/purchase-history/purchase-history.component'
import { OrderSpentReportComponent } from './customer/order-spent-report/order-spent-report.component'
import { FoodDetailsComponent } from './customer/food-list/food-details/food-details.component'
import { ViewOrdersComponent } from './vendor/view-order/view-order.component'
import { OrderStatusesComponent} from './order-status/order-status.component'
import { CreateEditOrderStatusModalComponent } from './order-status/create-edit-order-status-modal/create-edit-order-status-modal.component'
import { OrdersComponent } from './customer/orders/order.component'
import { FoodOrderCartModalFooterComponent} from './customer/orders/food-order-cart-modal/food-order-cart-modal'
import { FoodOrderProceedModalFooterComponent} from './customer/orders/food-order-proceed-modal/food-order-proceed-modal'
import { DashboardComponent } from './dashboard/dashboard'


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        // tenants
        TenantsComponent,
        CreateTenantDialogComponent,
        EditTenantDialogComponent,
        // roles
        RolesComponent,
        CreateRoleDialogComponent,
        EditRoleDialogComponent,
        // users
        UsersComponent,
        CreateUserDialogComponent,
        EditUserDialogComponent,
        ChangePasswordComponent,
        ResetPasswordDialogComponent,
        // layout
        HeaderComponent,
        HeaderLeftNavbarComponent,
        HeaderLanguageMenuComponent,
        HeaderUserMenuComponent,
        FooterComponent,
        SidebarComponent,
        SidebarLogoComponent,
        SidebarUserPanelComponent,
        SidebarMenuComponent,
        DivisionsComponent,
        CreateEditDivisionModalComponent,
        CustomersComponent,
        CreateEditCustomerModalComponent,
        CategoriesComponent,
        CreateEditCategoryModalComponent,
        TypesComponent,
        CreateEditTypeModalComponent,
        FoodsComponent,
        CreateEditFoodModalComponent,
        AddToCartsComponent,
        OrderSpentReportComponent,
        FoodListComponent,
        PurchaseHistoryComponent,
        ReportsComponent,
        FoodDetailsComponent,
        ViewOrdersComponent,
        OrderStatusesComponent,
        CreateEditOrderStatusModalComponent,
        OrdersComponent,
        FoodOrderCartModalFooterComponent,
        FoodOrderProceedModalFooterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        ModalModule.forChild(),
        BsDropdownModule,
        CollapseModule,
        TabsModule,
        AppRoutingModule,
        ServiceProxyModule,
        SharedModule,
        NgxPaginationModule,
    ],
    providers: [
        DivisionServiceProxy,
        CustomerServiceProxy,
        CategoryServiceProxy,
        TypeServiceProxy,
        FoodServiceProxy,
        OrderServiceProxy,
        OrderStatusServiceProxy,
        CartServiceProxy
    ]
})
export class AppModule {}
