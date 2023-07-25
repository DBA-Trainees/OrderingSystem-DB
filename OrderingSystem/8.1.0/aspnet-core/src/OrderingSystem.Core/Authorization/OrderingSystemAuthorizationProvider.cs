using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;
using System.Drawing;

namespace OrderingSystem.Authorization
{
    public class OrderingSystemAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            context.CreatePermission(PermissionNames.Pages_Users, L("Users"));
            context.CreatePermission(PermissionNames.Pages_Users_Activation, L("UsersActivation"));
            context.CreatePermission(PermissionNames.Pages_Roles, L("Roles"));
            context.CreatePermission(PermissionNames.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);

            //var vendorView = context.CreatePermission("Vendor");
            //var foodPage = context.CreatePermission(PermissionNames.Pages_Foods, L("Food"));
            //foodPage.CreateChildPermission(PermissionNames.Pages_Foods_Create_Update, L("FoodCreateEdit"));
            //foodPage.CreateChildPermission(PermissionNames.Pages_Foods_FoodList, L("FoodList"));
            //foodPage.CreateChildPermission(PermissionNames.Pages_Foods_FoodDetails, L("FoodDetails"));                                  

            var admin = context.GetPermissionOrNull(PermissionNames.Pages_Admin) ?? context.CreatePermission(PermissionNames.Pages_Admin, L("AdminView"));

            var division = admin.CreateChildPermission(PermissionNames.Pages_Admin_Divisions, L("Division"));
            //division.CreateChildPermission(PermissionNames.Pages_Admin_Divisions_Create, L("CreateDivision"));
            //division.CreateChildPermission(PermissionNames.Pages_Admin_Divisions_Update, L("UpdateDivision"));
            //division.CreateChildPermission(PermissionNames.Pages_Admin_Division_Delete, L("DeleteDivision"));

            var customer = admin.CreateChildPermission(PermissionNames.Pages_Admin_Customers, L("Customer"));
            //customer.CreateChildPermission(PermissionNames.Pages_Admin_Customers_Create, L("CreateCustomer"));
            //customer.CreateChildPermission(PermissionNames.Pages_Admin_Customers_Update, L("UpdateCustomer"));
            //customer.CreateChildPermission(PermissionNames.Pages_Admin_Customers_Delete, L("DeleteCustomer"));

            var vendor = context.GetPermissionOrNull(PermissionNames.Pages_Vendor) ?? context.CreatePermission(PermissionNames.Pages_Vendor, L("VendorView"));

            vendor.CreateChildPermission(PermissionNames.Pages_Vendor_Categories, L("Category"));
            vendor.CreateChildPermission(PermissionNames.Pages_Vendor_Types, L("Type"));
            vendor.CreateChildPermission(PermissionNames.Pages_Vendor_Foods, L("Food"));
            vendor.CreateChildPermission(PermissionNames.Pages_Vendor_ViewOrders, L("ViewOrder"));
            vendor.CreateChildPermission(PermissionNames.Pages_Vendor_SalesReports, L("SalesReport"));

            var customerView = context.GetPermissionOrNull(PermissionNames.Pages_Customer) ?? context.CreatePermission(PermissionNames.Pages_Customer, L("CustomerView"));

            customerView.CreateChildPermission(PermissionNames.Pages_Customer_FoodList, L("FoodList"));
            customerView.CreateChildPermission(PermissionNames.Pages_Customer_FoodDetails, L("FoodDetails"));
            customerView.CreateChildPermission(PermissionNames.Pages_Customer_AddToCart, L("AddToCart"));
            customerView.CreateChildPermission(PermissionNames.Pages_Customer_PurchaseHistory, L("PurchaseHistory"));
            customerView.CreateChildPermission(PermissionNames.Pages_Customer_OrderSpentReport, L("OrderSpentReport"));
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, OrderingSystemConsts.LocalizationSourceName);
        }
    }
}
