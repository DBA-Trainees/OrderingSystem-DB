using Abp.Application.Services;
using Abp.Domain.Repositories;
using OrderingSystem.Types.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OrderingSystem.Entities;

namespace OrderingSystem.Types
{
    public class TypeAppService : AsyncCrudAppService <Entities.Type, TypeDto, int, PagedTypeResultRequestDto, CreateTypeDto, TypeDto>, ITypeAppService
    {
        private readonly IRepository<Entities.Type, int> _repository;

        public TypeAppService(IRepository<Entities.Type, int> repository) : base(repository)
        {
            _repository = repository;
        }
    }
}
