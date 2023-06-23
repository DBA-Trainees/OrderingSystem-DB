using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using OrderingSystem.EntityFrameworkCore;
using OrderingSystem.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace OrderingSystem.Web.Tests
{
    [DependsOn(
        typeof(OrderingSystemWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class OrderingSystemWebTestModule : AbpModule
    {
        public OrderingSystemWebTestModule(OrderingSystemEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(OrderingSystemWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(OrderingSystemWebMvcModule).Assembly);
        }
    }
}