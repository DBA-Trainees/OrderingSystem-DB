using System.Threading.Tasks;
using OrderingSystem.Configuration.Dto;

namespace OrderingSystem.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
