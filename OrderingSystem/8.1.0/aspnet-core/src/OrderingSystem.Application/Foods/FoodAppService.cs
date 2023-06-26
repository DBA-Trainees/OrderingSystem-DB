using Abp.Application.Services;
using Abp.Domain.Repositories;
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
    }
}
