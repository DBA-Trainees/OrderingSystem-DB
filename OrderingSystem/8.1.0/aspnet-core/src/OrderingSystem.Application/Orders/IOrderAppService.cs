using Abp.Application.Services;
using OrderingSystem.Orders.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Orders
{
    public interface IOrderAppService : IAsyncCrudAppService <OrderDto, int, PagedOrderResultRequestDto, CreateOrderDto, OrderDto>
    {
    }
}
