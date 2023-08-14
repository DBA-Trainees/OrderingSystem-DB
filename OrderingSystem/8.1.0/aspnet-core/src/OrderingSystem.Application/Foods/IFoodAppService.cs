using Abp.Application.Services;
using Abp.Application.Services.Dto;
using OrderingSystem.Foods.Dto;
using OrderingSystem.Types.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Foods
{
    public interface IFoodAppService : IAsyncCrudAppService <FoodDto, int, PagedFoodResultRequestDto, CreateFoodDto, FoodDto>
    {
        Task<PagedResultDto<FoodDto>> GetAllAsync(PagedFoodResultRequestDto input);
        Task<FoodDto> CreateAsync(CreateFoodDto input);
        Task<PagedResultDto<FoodDto>> GetAllAvailableFoods(PagedFoodResultRequestDto input);
        Task<int> GetFoodCount();
    }
}
