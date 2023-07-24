using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using OrderingSystem.Authorization.Roles;
using OrderingSystem.Entities;
using OrderingSystem.Foods.Dto;
using OrderingSystem.Orders.Dto;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Orders
{
    public class OrderAppService : AsyncCrudAppService<Order, OrderDto, int, PagedOrderResultRequestDto, CreateOrderDto, OrderDto>, IOrderAppService
    {
        private readonly IRepository<Order, int> _repository;
        private readonly IRepository<Food, int> _foodRepository;
        private readonly IRepository<Role> _roleRepository;
        public OrderAppService(IRepository<Order, int> repository, IRepository<Food, int> foodRepository, IRepository<Role> roleRepository) : base(repository)
        {
            _repository = repository;
            _foodRepository = foodRepository;
            _roleRepository = roleRepository;
            _roleRepository = roleRepository;
        }

        public override async Task<OrderDto> CreateAsync(CreateOrderDto input)
        {
            var order = ObjectMapper.Map<Order>(input);
            await _repository.InsertAsync(order);

            var role = await _roleRepository.GetAsync(input.CustomerId);
            if(role.Id == 3)
            {
                var food = await _foodRepository.GetAsync(input.FoodId);
                if (food != null)
                {
                    input.FoodId = food.Id;
                }
                await _foodRepository.UpdateAsync(food);
            }

            return base.MapToEntityDto(order);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
        }

        public override async Task<PagedResultDto<OrderDto>> GetAllAsync(PagedOrderResultRequestDto input)
        {
            var order = await _repository.GetAll()
                .Include(x => x.Food)
                .Include(x => x.Customer)
                .Select( x => ObjectMapper.Map<OrderDto>(x))
                .ToListAsync();

            return new PagedResultDto<OrderDto>(order.Count(), order);
        }

        public async Task<List<OrderDto>> GetAllOrders()
        {
            var order = await _repository.GetAllListAsync();
            return ObjectMapper.Map<List<OrderDto>>(order);
        }

        public override Task<OrderDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }

        public override Task<OrderDto> UpdateAsync(OrderDto input)
        {
            return base.UpdateAsync(input);
        }
    }
}
