using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using OrderingSystem.Entities;
using OrderingSystem.OrderStatuses.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.OrderStatuses
{
    public class OrderStatusAppService : AsyncCrudAppService<Entities.OrderStatus, OrderStatusDto, int, PagedOrderStatusResultRequestDto, CreateOrderStatusDto, OrderStatusDto>, IOrderStatusAppService
    {
        private readonly IRepository<OrderStatus, int> _repository;
        public OrderStatusAppService(IRepository<Entities.OrderStatus, int> repository) : base(repository)
        {
            _repository = repository;
        }

        public override Task<OrderStatusDto> CreateAsync(CreateOrderStatusDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
        }

        public override Task<PagedResultDto<OrderStatusDto>> GetAllAsync(PagedOrderStatusResultRequestDto input)
        {
            return base.GetAllAsync(input);
        }

        public override Task<OrderStatusDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }

        public override Task<OrderStatusDto> UpdateAsync(OrderStatusDto input)
        {
            return base.UpdateAsync(input);
        }
    }
}
