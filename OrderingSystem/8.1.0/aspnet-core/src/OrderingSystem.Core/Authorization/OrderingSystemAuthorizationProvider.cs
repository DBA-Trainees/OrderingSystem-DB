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
            //var pages = context.GetPermissionOrNull(PermissionNames.Pages) ?? context.CreatePermission(PermissionNames.Pages);

            context.CreatePermission(PermissionNames.Pages_Users, L("Users"));
            context.CreatePermission(PermissionNames.Pages_Users_Activation, L("UsersActivation"));
            context.CreatePermission(PermissionNames.Pages_Roles, L("Roles"));
            context.CreatePermission(PermissionNames.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);

            //var vendorView = context.CreatePermission("Vendor");
            //var foodPage = context.CreatePermission(PermissionNames.Pages_Foods, L("Food"));
            //foodPage.CreateChildPermission(PermissionNames.Pages_Foods_Create_Update, L("FoodCreateEdit"));
            //foodPage.CreateChildPermission(PermissionNames.Pages_Foods_FoodList, L("FoodList"));
            //foodPage.CreateChildPermission(PermissionNames.Pages_Foods_FoodDetails, L("FoodDetails"));

            context.CreatePermission(PermissionNames.Pages_Foods, L("Food"));
            context.CreatePermission(PermissionNames.Pages_Foods_Create_Update, L("FoodCreateEdit"));
            context.CreatePermission(PermissionNames.Pages_Foods_FoodList, L("FoodList"));
            context.CreatePermission(PermissionNames.Pages_Foods_FoodDetails, L("FoodDetails"));

            context.CreatePermission(PermissionNames.Pages_Categories, L("Category"));
            context.CreatePermission(PermissionNames.Pages_Types, L("Type"));
            context.CreatePermission(PermissionNames.Pages_ViewOrders, L("ViewOrder"));
            context.CreatePermission(PermissionNames.Pages_SalesReports, L("SalesReport"));
            context.CreatePermission(PermissionNames.Pages_PurchaseHistory, L("PurchaseHistory"));
            context.CreatePermission(PermissionNames.Pages_OrderSpentReport, L("OrderSpentReport"));
            context.CreatePermission(PermissionNames.Pages_AddToCart, L("AddToCart"));

            var admin = context.GetPermissionOrNull(PermissionNames.Pages_Admin) ?? context.CreatePermission(PermissionNames.Pages_Admin);

            var division = admin.CreateChildPermission(PermissionNames.Pages_Admin_Divisions, L("Division"));
            division.CreateChildPermission(PermissionNames.Pages_Admin_Divisions_Create, L("CreateDivision"));
            division.CreateChildPermission(PermissionNames.Pages_Admin_Divisions_Update, L("UpdateDivision"));
            division.CreateChildPermission(PermissionNames.Pages_Admin_Division_Delete, L("DeleteDivision"));

            var customer = admin.CreateChildPermission(PermissionNames.Pages_Admin_Customers, L("Customer"));
            customer.CreateChildPermission(PermissionNames.Pages_Admin_Customers_Create, L("CreateCustomer"));
            customer.CreateChildPermission(PermissionNames.Pages_Admin_Customers_Update, L("UpdateCustomer"));
            customer.CreateChildPermission(PermissionNames.Pages_Admin_Customers_Delete, L("DeleteCustomer"));
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, OrderingSystemConsts.LocalizationSourceName);
        }
    }
}
