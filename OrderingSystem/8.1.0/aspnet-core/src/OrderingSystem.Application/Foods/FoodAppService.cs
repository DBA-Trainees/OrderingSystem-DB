using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using OrderingSystem.Authorization;
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
    [AbpAuthorize]
    public class FoodAppService : AsyncCrudAppService 
        <Food, 
        FoodDto, 
        int, 
        PagedFoodResultRequestDto, 
        CreateFoodDto, 
        FoodDto>, IFoodAppService
    {
        private readonly IRepository <Food, int> _repository;

        public FoodAppService(IRepository<Food, int> repository) : base(repository)
        {
            _repository = repository;
        }
        [AbpAuthorize(PermissionNames.Pages_Vendor_Foods)]
        public override Task<FoodDto> CreateAsync(CreateFoodDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
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

        public async Task<PagedResultDto<FoodDto>> GetAllAvailableFoods(PagedFoodResultRequestDto input)
        {
            var food = await _repository.GetAll()
                .Include(x => x.Category)
                .Include(x => x.Type)
                .OrderByDescending(x => x.Id)
                .Where(x => x.Availability)
                .Select(x => ObjectMapper.Map<FoodDto>(x))                
                .ToListAsync();

            return new PagedResultDto<FoodDto>(food.Count(), food);
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
        public override Task<FoodDto> UpdateAsync(FoodDto input)
        {
            return base.UpdateAsync(input);
        }

        public async Task<FoodDto> GetAllFoodWithCategory(EntityDto<int> input)
        {
            var food = await _repository.GetAll()
                .Include(x => x.Category)
                .Include (x => x.Type)
                .Where(x => x.Id == input.Id)
                .Select(x => ObjectMapper.Map<FoodDto>(x))                
                .FirstOrDefaultAsync();

            return food;
        }

        public async Task<int> GetFoodCount()
        {
            return await _repository.CountAsync();
        }

        public async Task<int> GetAvailableFoodCount()
        {
            return await _repository.CountAsync(food => food.Availability == true && food.Quantity > 0);
        }
        public async Task<int> GetUnavailableFoodCount()
        {
            return await _repository.CountAsync(food => food.Availability == false || food.Quantity <= 0);
        }
    }
}
