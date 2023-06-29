using Abp.Application.Services;
using Abp.Domain.Repositories;
using OrderingSystem.Entities;
using OrderingSystem.Foods.Dto;
using OrderingSystem.Orders.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Orders
{
    public class OrderAppService : AsyncCrudAppService<Order, OrderDto, int, PagedOrderResultRequestDto, CreateOrderDto, OrderDto>, IOrderAppService
    {
        private readonly IRepository<Order, int> _repository;
        public OrderAppService(IRepository<Order, int> repository) : base(repository)
        {
            _repository = repository;
        }

        public async Task<List<OrderDto>> GetAllOrders()
        {
            var order = await _repository.GetAllListAsync();
            return ObjectMapper.Map<List<OrderDto>>(order);
        }
    }
}
