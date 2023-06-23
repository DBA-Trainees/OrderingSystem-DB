using System.Threading.Tasks;
using Abp.Application.Services;
using OrderingSystem.Sessions.Dto;

namespace OrderingSystem.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
