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
        private readonly IRepository<Food, int> _foodRepository;
        public OrderAppService(IRepository<Order, int> repository, IRepository<Food, int>foodRepository) : base(repository)
        {
            _repository = repository;
            _foodRepository = foodRepository;
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
                .Include(x => x.Food)
                .Include(x => x.User)
                .Select(x => ObjectMapper.Map<OrderDto>(x))
                .FirstOrDefaultAsync();

            return order;
        }

        public override async Task<OrderDto> UpdateAsync(OrderDto input)
        {
            var userId = AbpSession.GetUserId();
            var order = ObjectMapper.Map<Order>(input);

            order.FoodId = input.FoodId;
            order.UserId = userId;

            await _repository.UpdateAsync(order);
            return ObjectMapper.Map<OrderDto>(order);
        }

        public async Task<PagedResultDto<OrderDto>> GetAllPurchaseOrders(PagedOrderResultRequestDto input)
        {
            var userId = AbpSession.GetUserId();
            var order = await _repository
                .GetAllIncluding(
                x => x.Food,
                x => x.User,
                x => x.OrderStatus)
                .Where(x => x.UserId == userId)
                .OrderByDescending(x => x.Id)
                .Select(x => ObjectMapper.Map<OrderDto>(x))
                .ToListAsync();

            return new PagedResultDto<OrderDto>(order.Count(), order);
        }

        //public async Task<ListResultDto<OrderDto>> CreateMultipleCartOrder(List<CreateOrderDto> inputs)
        //{
        //    var order = new Order
        //    {
        //        DateTimeOrdered = input.DateTimeOrdered.ToLocalTime(),
        //        TotalAmount = input.TotalAmount
        //    };

        //    var createdOrder = await _repository.InsertAsync(order);

        //    foreach (var cartInput in input.Carts)
        //    {
        //        var cart = new Cart
        //        {
        //            FoodId = cartInput.FoodId,
        //            Size = cartInput.Size,
        //            Quantity = cartInput.Quantity
        //        };

        //        await _cartRepository.InsertAsync(cart);
        //    }

        //    return ObjectMapper.Map<OrderDto>(createdOrder);
        //}
        public async Task<OrderDto> GetOrder(EntityDto<int> input)
        {
            //var userId = AbpSession.GetUserId();
            var order = await _repository
                .GetAllIncluding(
                    x => x.Food,
                    x => x.User,
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
                        x => x.Food,
                        x => x.User,
                        x => x.OrderStatus)
                .OrderByDescending(x => x.Id)
                .Select(x => ObjectMapper.Map<OrderDto>(x))
                .ToListAsync();

            return new PagedResultDto<OrderDto>(order.Count(), order);
        }

        public override async Task<OrderDto> CreateAsync(CreateOrderDto input)
        {
            var userId = AbpSession.GetUserId();
            var order = ObjectMapper.Map<Order>(input);

            order.DateTimeAddedToCart = input.DateTimeAddedToCart.ToLocalTime();

            order.FoodId = input.FoodId;
            order.UserId = userId;

            order.OrderStatusId = 1;

            order = await _repository.InsertAsync(order);

            return ObjectMapper.Map<OrderDto>(order);
        }

        public async Task<OrderDto> UpdateAddToCart(OrderDto input)
        {
            var userId = AbpSession.GetUserId();
            var order = ObjectMapper.Map<Order>(input);
            var existingFoodOrder = await _repository
                .FirstOrDefaultAsync(
                o => o.FoodId == input.FoodId && o.UserId == userId
            );

            if (existingFoodOrder != null)
            {
                existingFoodOrder.Quantity += input.Quantity;
                existingFoodOrder.DateTimeAddedToCart = input.DateTimeAddedToCart.ToLocalTime();
                existingFoodOrder.Size = input.Size;

                await _repository.UpdateAsync(existingFoodOrder);
                return ObjectMapper.Map<OrderDto>(existingFoodOrder);
            }
            else
            {
                order = ObjectMapper.Map<Order>(input);
                order.DateTimeAddedToCart = input.DateTimeAddedToCart.ToLocalTime();
                order.FoodId = input.FoodId;
                order.UserId = userId;
                order.OrderStatusId = 1;
                await _repository.InsertAsync(order);
                return ObjectMapper.Map<OrderDto>(order);
            }
        }

        public async Task<PagedResultDto<OrderDto>> GetAllOrderInCart(PagedOrderResultRequestDto input)
        {
            var userId = AbpSession.GetUserId();

            var order = await _repository.GetAll()
                .Include(x => x.Food)
                .ThenInclude(x => x.Category)
                .Include(x => x.User)
                .Include(x => x.OrderStatus)
                .Where(x => x.UserId == userId)
                .OrderByDescending(x => x.DateTimeAddedToCart)
                .Select(x => ObjectMapper.Map<OrderDto>(x))
                .ToListAsync();

            return new PagedResultDto<OrderDto>(order.Count(), order);
        }

        public List<Guid?> GetOrderIdsByOrderNumber()
        {
            var query = _repository.GetAll()
                .OrderBy(x => x.Id)
                .Select(x => x.OrderNumber)
                .Distinct()
                .ToList();

            return query;
        }

        public async Task<OrderDto> UpdateBeforeProceedOrder(OrderDto input)
        {
            var order = new Order();
            foreach (var item in input.Orders)
            {
                 order = ObjectMapper.Map<Order>(item);
                order.Id = item.Id;
                order.OrderStatusId = 2;
                await _repository.UpdateAsync(order);

                var food = await _foodRepository.GetAsync(item.FoodId);
                food.Quantity -= order.Quantity;
                await _foodRepository.UpdateAsync(food);
            }           
            
            return base.MapToEntityDto(order);
        }

    }
}