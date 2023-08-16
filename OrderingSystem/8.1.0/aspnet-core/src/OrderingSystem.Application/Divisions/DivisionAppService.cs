using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using OrderingSystem.Divisions.Dto;
using OrderingSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Divisions
{
    public class DivisionAppService : AsyncCrudAppService<Division, DivisionDto, int, PagedDivisionResultRequestDto, CreateDivisionDto, DivisionDto>, IDivisionAppService
    {
        private readonly IRepository<Division, int> _repository;

        public DivisionAppService(IRepository<Division, int> repository) : base(repository)
        {
            _repository = repository;
        }

        public override async Task<DivisionDto> CreateAsync(CreateDivisionDto input)
        {
            var division = ObjectMapper.Map<Division>(input);

            if(division.Name != input.Name)
            {
                division = await _repository.InsertAsync(division);                
            }
            return ObjectMapper.Map<DivisionDto>(division);
        }

        public async Task<List<DivisionDto>> GetAllDivisions()
        {
            var division = await _repository.GetAllListAsync();
            return ObjectMapper.Map<List<DivisionDto>>(division);
        }
        public async Task<int> GetDivisionCount()
        {
            return await _repository.CountAsync();
        }
    }
}
