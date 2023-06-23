using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using OrderingSystem.Configuration.Dto;

namespace OrderingSystem.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : OrderingSystemAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
