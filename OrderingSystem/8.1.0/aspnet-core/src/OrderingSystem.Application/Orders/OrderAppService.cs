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
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Orders
{
    public class OrderAppService : AsyncCrudAppService<
        Order, 
        OrderDto, 
        int, 
        PagedOrderResultRequestDto, 
        CreateOrderDto, 
        OrderDto
        >, IOrderAppService
    {
        private readonly IRepository<Order, int> _repository;
        public OrderAppService(IRepository<Order, int> repository) : base(repository)
        {
            _repository = repository;
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
        }

        public override async Task<PagedResultDto<OrderDto>> GetAllAsync(PagedOrderResultRequestDto input)
        {
            var order = await _repository.GetAll()
                .Include(x => x.Cart)
                .Include(x => x.OrderStatus)
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

        public async Task<OrderDto> GetOrderDetails(EntityDto<int> input)
        {
            var order = await _repository.GetAll()
                .Include(x => x.Cart)
                .Select(x => ObjectMapper.Map<OrderDto>(x))
                .FirstOrDefaultAsync();

            return order;
        }

        public override Task<OrderDto> UpdateAsync(OrderDto input)
        {
            return base.UpdateAsync(input);
        }

        public async Task<PagedResultDto<OrderDto>> GetAllPurchaseOrders(PagedOrderResultRequestDto input)
        {
            var userId = AbpSession.GetUserId();
            var order = await _repository
                .GetAllIncluding(
                x => x.Cart,
                x => x.Cart.Food,
                x => x.Cart.User,
                x => x.OrderStatus)
                .Where(x => x.Cart.UserId == userId)
                .OrderByDescending(x => x.Id)
                .Select(x => ObjectMapper.Map<OrderDto>(x))
                .ToListAsync();

            return new PagedResultDto<OrderDto>(order.Count(), order);
        }

        public async Task<ListResultDto<OrderDto>> CreateMultipleCartOrder(List<CreateOrderDto> inputs)
        {
            {
                var createdOrders = new List<Order>();

                foreach (var input in inputs)
                {
                    var order = ObjectMapper.Map<Order>(input);
                    order.DateTimeOrdered = input.DateTimeOrdered.ToLocalTime();

                    var cartsForOrder = new List<Cart>();

                    foreach (var cartInput in input.Carts)
                    {
                        var cart = ObjectMapper.Map<Cart>(cartInput);
                        cartsForOrder.Add(cart);
                    }

                    order.Carts = cartsForOrder;

                    var createdOrder = await _repository.InsertAsync(order);
                    createdOrders.Add(createdOrder);
                }

                return new ListResultDto<OrderDto>(
                    ObjectMapper.Map<List<OrderDto>>(createdOrders)
                );
            }

        }
        public async Task<OrderDto> GetOrder(EntityDto<int> input)
        {
            //var userId = AbpSession.GetUserId();
            var order = await _repository
                .GetAllIncluding(
                    x => x.Cart,
                    x => x.Cart.Food,
                    x => x.Cart.User,
                    x => x.OrderStatus)
                .Where(x => x.Id == input.Id /*&& x.Cart.UserId == */)
                .Select(x => ObjectMapper.Map<OrderDto>(x))
                .FirstOrDefaultAsync();

            return order;
        }

        public async Task<PagedResultDto<OrderDto>> GetAllOrdersVendorView(PagedOrderResultRequestDto input)
        {
            var order = await _repository
                .GetAllIncluding(
                x => x.Cart,
                x => x.Cart.Food,
                x => x.Cart.User,
                x => x.Cart.Food.Category,
                x => x.OrderStatus)
                .OrderByDescending(x => x.Id)
                .Select(x => ObjectMapper.Map<OrderDto>(x))
                .ToListAsync();

            return new PagedResultDto<OrderDto>(order.Count(), order);
        }
    }
}