using Abp.Application.Services;
using OrderingSystem.Divisions.Dto;
using OrderingSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Divisions
{
    public interface IDivisionAppService : IAsyncCrudAppService <DivisionDto, int, PagedDivisionResultRequestDto, CreateDivisionDto, DivisionDto>
    {
        Task<List<DivisionDto>> GetAllDivisions();
        Task<int> GetDivisionCount();
    }
}
