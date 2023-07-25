import { Component, Injector, OnInit } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  Router,
  RouterEvent,
  NavigationEnd,
  PRIMARY_OUTLET,
} from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { filter } from "rxjs/operators";
import { MenuItem } from "@shared/layout/menu-item";

@Component({
  selector: "sidebar-menu",
  templateUrl: "./sidebar-menu.component.html",
})
export class SidebarMenuComponent extends AppComponentBase implements OnInit {
  menuItems: MenuItem[];
  menuItemsMap: { [key: number]: MenuItem } = {};
  activatedMenuItems: MenuItem[] = [];
  routerEvents: BehaviorSubject<RouterEvent> = new BehaviorSubject(undefined);
  homeRoute = "/app/about";

  constructor(injector: Injector, private router: Router) {
    super(injector);
    this.router.events.subscribe(this.routerEvents);
  }

  ngOnInit(): void {
    this.menuItems = this.getMenuItems();
    this.patchMenuItems(this.menuItems);
    this.routerEvents
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const currentUrl = event.url !== "/" ? event.url : this.homeRoute;
        const primaryUrlSegmentGroup =
          this.router.parseUrl(currentUrl).root.children[PRIMARY_OUTLET];
        if (primaryUrlSegmentGroup) {
          this.activateMenuItems("/" + primaryUrlSegmentGroup.toString());
        }
      });
  }

  getMenuItems(): MenuItem[] {
    return [
      new MenuItem(this.l("Admin"), "", "", "Pages.Admin", [
        new MenuItem(this.l("Divisions"),"/app/admin/divisions","fas fa-user-friends","Pages.Admin.Divisions"),
        new MenuItem(this.l("Customers"),"/app/admin/customers","fas fa-restroom","Pages.Admin.Customers"),
        new MenuItem(this.l("Roles"),"/app/roles","fas fa-theater-masks","Pages.Roles"),
        new MenuItem(this.l("Users"),"/app/users","fas fa-users","Pages.Users"),
      ]),
      new MenuItem(this.l("Vendor"), "", "", "Pages.Vendor", [
        new MenuItem(this.l("Food Categories"),"/app/vendor/categories","fas fa-hamburger","Pages.Vendor.Categories"),
        new MenuItem(this.l("Food Types"),"/app/vendor/types","fas fa-drumstick-bite","Pages.Vendor.Types"),
        new MenuItem(this.l("Food"),"/app/vendor/foods","fa fa-cutlery","Pages.Vendor.Foods"),
        new MenuItem(this.l("ViewOrder"),"/app/vendor/view-order","fa fa-shopping-cart","Pages.Vendor.ViewOrders"),
        new MenuItem(this.l("Reports"),"/app/vendor/reports","fa fa-pie-chart","Pages.Vendor.SalesReports"),
      ]),  
      new MenuItem(this.l("Customer"), "", "", "Pages.Customer", [
        new MenuItem(this.l("Food List"),"/app/customer/food-list","fas fa-th-list","Pages.Customer.FoodList"),
        new MenuItem(this.l("AddToCart"),"/app/customer/carts","fa fa-cart-plus","Pages.Customer.Carts"),
        new MenuItem(this.l("PurchaseHistory"),"/app/customer/purchase-history","fa fa-history","Pages.Customer.PurchaseHistory"),
        new MenuItem(this.l("OrderSpentReport"),"/app/customer/order-spent-report","fa fa-calendar","Pages.Customer.OrderSpentReport"),
      ]),          
      /* new MenuItem(this.l("About"), "/app/about", "fas fa-info-circle"),
      new MenuItem(this.l("HomePage"), "/app/home", "fas fa-home"), */
      new MenuItem(
        this.l("Tenants"),
        "/app/tenants",
        "fas fa-building",
        "Pages.Tenants"
      )
    ];
  }

  patchMenuItems(items: MenuItem[], parentId?: number): void {
    items.forEach((item: MenuItem, index: number) => {
      item.id = parentId ? Number(parentId + "" + (index + 1)) : index + 1;
      if (parentId) {
        item.parentId = parentId;
      }
      if (parentId || item.children) {
        this.menuItemsMap[item.id] = item;
      }
      if (item.children) {
        this.patchMenuItems(item.children, item.id);
      }
    });
  }

  activateMenuItems(url: string): void {
    this.deactivateMenuItems(this.menuItems);
    this.activatedMenuItems = [];
    const foundedItems = this.findMenuItemsByUrl(url, this.menuItems);
    foundedItems.forEach((item) => {
      this.activateMenuItem(item);
    });
  }

  deactivateMenuItems(items: MenuItem[]): void {
    items.forEach((item: MenuItem) => {
      item.isActive = false;
      item.isCollapsed = true;
      if (item.children) {
        this.deactivateMenuItems(item.children);
      }
    });
  }

  findMenuItemsByUrl(
    url: string,
    items: MenuItem[],
    foundedItems: MenuItem[] = []
  ): MenuItem[] {
    items.forEach((item: MenuItem) => {
      if (item.route === url) {
        foundedItems.push(item);
      } else if (item.children) {
        this.findMenuItemsByUrl(url, item.children, foundedItems);
      }
    });
    return foundedItems;
  }

  activateMenuItem(item: MenuItem): void {
    item.isActive = true;
    if (item.children) {
      item.isCollapsed = false;
    }
    this.activatedMenuItems.push(item);
    if (item.parentId) {
      this.activateMenuItem(this.menuItemsMap[item.parentId]);
    }
  }

  isMenuItemVisible(item: MenuItem): boolean {
    if (!item.permissionName) {
      return true;
    }
    return this.permission.isGranted(item.permissionName);
  }
}
