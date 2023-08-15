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
            context.CreatePermission(PermissionNames.Pages_Users_Activation, L("UsersActivationAdmin"));
            context.CreatePermission(PermissionNames.Pages_Roles, L("RolesAdmin"));
            context.CreatePermission(PermissionNames.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);

            var admin = context.GetPermissionOrNull(PermissionNames.Pages_Admin) ?? context.CreatePermission(PermissionNames.Pages_Admin, L("AdminView"));

            var division = admin.CreateChildPermission(PermissionNames.Pages_Admin_Divisions, L("DivisionsAdmin"));

            var customer = admin.CreateChildPermission(PermissionNames.Pages_Admin_Customers, L("CustomersAdmin"));

            var vendor = context.GetPermissionOrNull(PermissionNames.Pages_Vendor) ?? context.CreatePermission(PermissionNames.Pages_Vendor, L("VendorView"));

            vendor.CreateChildPermission(PermissionNames.Pages_Vendor_Categories, L("CategoryVendor"));
            vendor.CreateChildPermission(PermissionNames.Pages_Vendor_Types, L("TypeVendor"));
            vendor.CreateChildPermission(PermissionNames.Pages_Vendor_Foods, L("FoodVendor"));
            vendor.CreateChildPermission(PermissionNames.Pages_Vendor_ViewOrders, L("ViewOrderVendor"));
            vendor.CreateChildPermission(PermissionNames.Pages_Vendor_SalesReports, L("SalesReportVendor"));

            var customerView = context.GetPermissionOrNull(PermissionNames.Pages_Customer) ?? context.CreatePermission(PermissionNames.Pages_Customer, L("CustomerView"));

            customerView.CreateChildPermission(PermissionNames.Pages_Customer_FoodList, L("FoodListCustomer"));
            customerView.CreateChildPermission(PermissionNames.Pages_Customer_FoodDetails, L("FoodDetailsCustomer"));
            customerView.CreateChildPermission(PermissionNames.Pages_Customer_AddToCart, L("AddToCartCustomer"));
            customerView.CreateChildPermission(PermissionNames.Pages_Customer_PurchaseHistory, L("PurchaseHistoryCustomer"));
            customerView.CreateChildPermission(PermissionNames.Pages_Customer_OrderSpentReport, L("OrderSpentReportCustomer"));
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, OrderingSystemConsts.LocalizationSourceName);
        }
    }
}
