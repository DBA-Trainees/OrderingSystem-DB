using Abp.Authorization;
using OrderingSystem.Authorization.Roles;
using OrderingSystem.Authorization.Users;

namespace OrderingSystem.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
