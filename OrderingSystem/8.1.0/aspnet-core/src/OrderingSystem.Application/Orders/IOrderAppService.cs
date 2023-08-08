using Abp.Application.Services;
using Abp.Application.Services.Dto;
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
        //Task<OrderDto> UpdateAddToCart(OrderDto input);
        Task<ListResultDto<OrderDto>> CreateMultipleCartOrder(List<CreateOrderDto> inputs);
        Task<OrderDto> GetOrder(EntityDto<int> input);
        Task<PagedResultDto<OrderDto>> GetAllPurchaseOrders(PagedOrderResultRequestDto input);
        Task<OrderDto> GetOrderDetails(EntityDto<int> input);
        Task<List<OrderDto>> GetAllOrders();
    }
}
