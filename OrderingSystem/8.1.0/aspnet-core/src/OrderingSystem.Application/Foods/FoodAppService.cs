using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using OrderingSystem.Categories.Dto;
using OrderingSystem.Entities;
using OrderingSystem.Foods.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Foods
{
    public class FoodAppService : AsyncCrudAppService <Food, FoodDto, int, PagedFoodResultRequestDto, CreateFoodDto, FoodDto>, IFoodAppService
    {
        private readonly IRepository <Food, int> _repository;

        public FoodAppService(IRepository<Food, int> repository) : base(repository)
        {
            _repository = repository;
        }        

        public override async Task<PagedResultDto<FoodDto>> GetAllAsync(PagedFoodResultRequestDto input)
        {
            var food = await _repository.GetAll()
                .Include(x => x.Category)
                .Include(x => x.Type)
                .OrderByDescending(x => x.Id)
                .Select(x => ObjectMapper.Map<FoodDto>(x))
                .ToListAsync();

            return new PagedResultDto<FoodDto> (food.Count(), food);
        }

        public async Task<List<FoodDto>> GetAllFoods()
        {
            var food = await _repository.GetAllListAsync();
            return ObjectMapper.Map<List<FoodDto>>(food);
        }

        public override Task<FoodDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }

    }
}
