using Abp.Application.Services;
using OrderingSystem.Carts.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Carts
{
    public interface ICartAppService: IAsyncCrudAppService <CartDto, int, PagedCartResultRequestDto, CreateCartDto,CartDto>
    {

    }
}
