using System.Threading.Tasks;
using Abp.Application.Services;
using OrderingSystem.Authorization.Accounts.Dto;

namespace OrderingSystem.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
