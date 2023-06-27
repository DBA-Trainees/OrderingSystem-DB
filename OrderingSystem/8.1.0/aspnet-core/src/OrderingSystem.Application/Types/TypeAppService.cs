using Abp.Application.Services;
using Abp.Domain.Repositories;
using OrderingSystem.Types.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OrderingSystem.Entities;
using OrderingSystem.Divisions.Dto;

namespace OrderingSystem.Types
{
    public class TypeAppService : AsyncCrudAppService <Entities.Type, TypeDto, int, PagedTypeResultRequestDto, CreateTypeDto, TypeDto>, ITypeAppService
    {
        private readonly IRepository<Entities.Type, int> _repository;

        public TypeAppService(IRepository<Entities.Type, int> repository) : base(repository)
        {
            _repository = repository;
        }
        public async Task<List<TypeDto>> GetAllFoodTypes()
        {
            var category = await _repository.GetAllListAsync();
            return ObjectMapper.Map<List<TypeDto>>(category);
        }
    }
}
