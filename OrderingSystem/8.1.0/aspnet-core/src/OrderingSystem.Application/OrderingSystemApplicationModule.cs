using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using OrderingSystem.Authorization;

namespace OrderingSystem
{
    [DependsOn(
        typeof(OrderingSystemCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class OrderingSystemApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<OrderingSystemAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(OrderingSystemApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
