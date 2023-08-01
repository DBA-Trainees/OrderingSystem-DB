using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using Microsoft.EntityFrameworkCore;
using OrderingSystem.Authorization.Roles;
using OrderingSystem.Authorization.Users;
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
        private readonly IRepository<User, long> _userRepository;
        public OrderAppService(IRepository<Order, int> repository, IRepository<Food, int> foodRepository, IRepository<User, long> userRepository) : base(repository)
        {
            _repository = repository;
            _foodRepository = foodRepository;
            _userRepository = userRepository;
        }

        public override async Task<OrderDto> CreateAsync(CreateOrderDto input)
        {
            var userId = AbpSession.GetUserId();
            var order = ObjectMapper.Map<Order>(input);
            order.DateTimeOrdered = input.DateTimeOrdered.ToLocalTime();

            order.FoodId = input.FoodId;
            order.UserId = userId;

            if(input.FoodId == order.FoodId)
            {
                order.Quantity = order.Quantity + input.Quantity;
            }

            order = await _repository.InsertAsync(order);

            return ObjectMapper.Map<OrderDto>(order);

        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
        }

        public override async Task<PagedResultDto<OrderDto>> GetAllAsync(PagedOrderResultRequestDto input)
        {
            var order = await _repository.GetAll()
                .Include(x => x.Food)
                .Include(x => x.User)
                .OrderByDescending(x => x.Id)
                .Select(x => ObjectMapper.Map<OrderDto>(x))
                .ToListAsync();

            return new PagedResultDto<OrderDto>(order.Count(), order);
        }

        public async Task<PagedResultDto<OrderDto>> GetAllOrderInCart(PagedOrderResultRequestDto input)
        {
            var userId = AbpSession.GetUserId();

            var order = await _repository.GetAll()
                .Include(x => x.Food)
                .Include(x => x.User)
                .Where(x => x.UserId == userId)
                .OrderByDescending(x => x.Id)
                .Select(x => ObjectMapper.Map<OrderDto>(x))
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
