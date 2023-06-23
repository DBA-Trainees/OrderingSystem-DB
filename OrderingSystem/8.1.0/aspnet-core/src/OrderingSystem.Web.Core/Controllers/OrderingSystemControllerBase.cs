using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace OrderingSystem.Controllers
{
    public abstract class OrderingSystemControllerBase: AbpController
    {
        protected OrderingSystemControllerBase()
        {
            LocalizationSourceName = OrderingSystemConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
