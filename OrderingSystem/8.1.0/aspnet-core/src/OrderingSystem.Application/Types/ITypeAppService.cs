using Abp.Application.Services;
using OrderingSystem.Types.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Types
{
    public interface ITypeAppService : IAsyncCrudAppService <TypeDto, int, PagedTypeResultRequestDto, CreateTypeDto, TypeDto>
    {

    }
}
