using Abp.Application.Services;
using Abp.Domain.Repositories;
using OrderingSystem.Categories.Dto;
using OrderingSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Categories
{
    public class CategoryAppService : AsyncCrudAppService<Category, CategoryDto, int, PagedCategoryResultRequestDto, CreateCategoryDto, CategoryDto>, ICategoryAppService
    {
        private readonly IRepository<Category, int> _repository;

        public CategoryAppService(IRepository<Category, int> repository) : base(repository)
        {
            _repository = repository;
        }
    }
}
