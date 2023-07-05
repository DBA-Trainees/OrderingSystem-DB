using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

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
            context.CreatePermission(PermissionNames.Pages_Divisions, L("Division"));
            context.CreatePermission(PermissionNames.Pages_Customers, L("Customer"));
            context.CreatePermission(PermissionNames.Pages_Categories, L("Category"));
            context.CreatePermission(PermissionNames.Pages_Types, L("Type"));
            context.CreatePermission(PermissionNames.Pages_Foods, L("Food"));
            context.CreatePermission(PermissionNames.Pages_ViewOrders, L("ViewOrder"));
            context.CreatePermission(PermissionNames.Pages_SalesReports, L("SalesReport"));
            context.CreatePermission(PermissionNames.Pages_PurchaseHistory, L("PurchaseHistory"));
            context.CreatePermission(PermissionNames.Pages_OrderSpentReport, L("OrderSpentReport"));
            context.CreatePermission(PermissionNames.Pages_AddToCart, L("AddToCart"));
            context.CreatePermission(PermissionNames.Pages_OrderList, L("OrderList"));
            context.CreatePermission(PermissionNames.Pages_OrderDetails, L("OrderDetails"));
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, OrderingSystemConsts.LocalizationSourceName);
        }
    }
}
