using Abp.Application.Services;
using OrderingSystem.OrderStatuses.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.OrderStatuses
{
    public interface IOrderStatusAppService: IAsyncCrudAppService <OrderStatusDto, int, PagedOrderStatusResultRequestDto, CreateOrderStatusDto, OrderStatusDto>
    {

    }
}
