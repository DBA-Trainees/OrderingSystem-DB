using Abp.Application.Services;
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
    }
}
