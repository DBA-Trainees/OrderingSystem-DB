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
    //[AbpAuthorize(PermissionNames.Pages_Foods)]
    public class FoodAppService : AsyncCrudAppService <Food, FoodDto, int, PagedFoodResultRequestDto, CreateFoodDto, FoodDto>, IFoodAppService
    {
        private readonly IRepository <Food, int> _repository;

        public FoodAppService(IRepository<Food, int> repository) : base(repository)
        {
            _repository = repository;
        }
        //[AbpAuthorize(PermissionNames.Pages_Foods)]
        //[AbpAuthorize(PermissionNames.Pages_Foods_Create_Update)]
        public override Task<FoodDto> CreateAsync(CreateFoodDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
        }
        //[AbpAuthorize(PermissionNames.Pages_Foods)]
        //[AbpAuthorize(PermissionNames.Pages_Foods_FoodList)]
        //[AbpAuthorize(PermissionNames.Pages_Foods_FoodDetails)]
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
        //[AbpAuthorize(PermissionNames.Pages_Foods)]
        public override Task<FoodDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }
        //[AbpAuthorize(PermissionNames.Pages_Foods)]
        //[AbpAuthorize(PermissionNames.Pages_Foods_Create_Update)]
        public override Task<FoodDto> UpdateAsync(FoodDto input)
        {
            return base.UpdateAsync(input);
        }
    }
}
