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
        Task<OrderDto> GetOrder(EntityDto<int> input);
        Task<PagedResultDto<OrderDto>> GetAllPurchaseOrders(PagedOrderResultRequestDto input);
        Task<OrderDto> GetOrderDetails(EntityDto<int> input);
        Task<List<OrderDto>> GetAllOrders();
        Task<PagedResultDto<OrderDto>> GetAllOrdersVendorView(PagedOrderResultRequestDto input);
        Task<OrderDto> UpdateAddToCart(OrderDto input);
        Task<OrderDto> UpdateBeforeProceedOrder(OrderDto input);
        Task<string?> GetMostPurchasedFoodId();
        Task<List<TotalSalesDto>> GetMonthlyPurchase();
        Task<List<TotalSalesDto>> GetDailyTotalSales();
        Task<List<TotalSalesDto>> GetYearlyTotalSales();
        Task<List<TotalSalesDto>> GetMonthlyTotalSales();
        Task<List<TotalSalesDto>> GetYearlyPurchase();
        Task<List<TotalSalesDto>> GetDailyPurchase();
        List<Guid?> GetOrderIdsByOrderNumber();
        //Task<PagedResultDto<OrderDto>> GetOrdersByOrderNumbersAsync(PagedOrderResultRequestDto input, List<Guid?> orderNumbers);
    }
}
