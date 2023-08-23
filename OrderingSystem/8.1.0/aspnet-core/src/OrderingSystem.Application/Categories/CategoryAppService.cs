using Abp.Application.Services;
using Abp.Domain.Repositories;
using OrderingSystem.Categories.Dto;
using OrderingSystem.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OrderingSystem.Categories
{
    public class CategoryAppService : AsyncCrudAppService<
        Category, 
        CategoryDto, 
        int, 
        PagedCategoryResultRequestDto, 
        CreateCategoryDto, 
        CategoryDto>, 
        ICategoryAppService
    {
        private readonly IRepository<Category, int> _repository;

        public CategoryAppService(IRepository<Category, int> repository) : base(repository)
        {
            _repository = repository;
        }

        public override async Task<CategoryDto> CreateAsync(CreateCategoryDto input)
        {
            var category = ObjectMapper.Map<Category>(input);
            var existingCategory = await _repository.FirstOrDefaultAsync(category => category.Name.Contains(input.Name));

            if (existingCategory == null)
            {
                category = await _repository.InsertAsync(category);
                return ObjectMapper.Map<CategoryDto>(category);
            }

            return base.MapToEntityDto(category);
        }

        public async Task<List<CategoryDto>> GetAllFoodCategories()
        {
            var category = await _repository.GetAllListAsync();
            return ObjectMapper.Map<List<CategoryDto>>(category);
        }
        public async Task<int> GetCategoryCount()
        {
            return await _repository.CountAsync();
        }
    }
}
