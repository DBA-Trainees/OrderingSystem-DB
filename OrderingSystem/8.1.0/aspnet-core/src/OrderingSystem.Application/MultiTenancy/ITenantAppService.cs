using Abp.Application.Services;
using OrderingSystem.MultiTenancy.Dto;

namespace OrderingSystem.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

