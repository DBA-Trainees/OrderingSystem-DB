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
using System.Text.RegularExpressions;
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
                .ThenInclude(x => x.Category)
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
                .ThenInclude(x => x.Category)
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
                x => x.Food.Category,
                x => x.User,
                x => x.OrderStatus)
                .Where(x => x.UserId == userId && x.OrderStatusId ==2 && x.DateTimeOrdered != null)
                .OrderByDescending(x => x.Id)
                .Select(x => ObjectMapper.Map<OrderDto>(x))
                .ToListAsync();

            return new PagedResultDto<OrderDto>(order.Count(), order);
        }

        public async Task<OrderDto> GetOrder(EntityDto<int> input)
        {
            //var userId = AbpSession.GetUserId();
            var order = await _repository
                .GetAllIncluding(
                    x => x.Food,
                    x => x.Food.Category,
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
                        x => x.Food.Category,
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
                .FirstOrDefaultAsync
                (
                o => o.OrderStatusId == 1 &&
                o.FoodId == input.FoodId && 
                o.UserId == userId); 

            if (existingFoodOrder != null)
            {
                existingFoodOrder.Quantity += input.Quantity;
                existingFoodOrder.DateTimeAddedToCart = input.DateTimeAddedToCart?.ToLocalTime();
                existingFoodOrder.Size = input.Size;

                await _repository.UpdateAsync(existingFoodOrder);
                return ObjectMapper.Map<OrderDto>(existingFoodOrder);
            }
            else
            {
                order = ObjectMapper.Map<Order>(input);
                order.DateTimeAddedToCart = input.DateTimeAddedToCart?.ToLocalTime();
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
                .Where(x => x.UserId == userId && x.OrderStatusId ==1)
                .OrderByDescending(x => x.DateTimeAddedToCart)
                .Select(x => ObjectMapper.Map<OrderDto>(x))
                .ToListAsync();

            return new PagedResultDto<OrderDto>(order.Count(), order);
        }

        public List<Guid?> GetOrderIdsByOrderNumber()
        {
            var userId = AbpSession.GetUserId();
            var orderNumberLatestOrder = _repository.GetAll()
                .Where(x => x.UserId == userId && x.OrderStatusId == 2)
                .GroupBy(x => x.OrderNumber)
                .ToDictionary(
                group => group.Key,
                group => group.Max(x => x.DateTimeOrdered));

            var query = orderNumberLatestOrder
                .OrderByDescending(x => x.Value)
                .Select(x => x.Key)
                .ToList();

            return query;

        }        

        public List<OrderDto> GetAllOrderWithOrderNumbers(List<Guid?> orderNumbers)
        {
            var userId = AbpSession.GetUserId();
            var query = _repository.GetAll()
                .Include(x => x.Food)
                .ThenInclude(x => x.Category)
                .Include(x => x.OrderStatus)
                .Where(x => x.UserId == userId && orderNumbers.Contains(x.OrderNumber) && x.OrderStatusId ==2)
                .ToList();

            return ObjectMapper.Map<List<OrderDto>>(query);
        }

        public async Task<OrderDto> UpdateBeforeProceedOrder(OrderDto input)
        {
            var order = new Order();
            var orderNumber = Guid.NewGuid();
            
            foreach (var item in input.Orders)
            {
                order = ObjectMapper.Map<Order>(item);
                order.Id = item.Id;
                order.DateTimeOrdered = item.DateTimeOrdered?.ToLocalTime();
                order.OrderStatusId = 2;
                order.OrderNumber = orderNumber;
                await _repository.UpdateAsync(order);

                var food = await _foodRepository.GetAsync(item.FoodId);
                food.Quantity -= order.Quantity;
                await _foodRepository.UpdateAsync(food);
            }           
            
            return base.MapToEntityDto(order);
        }

        public List<OrderDto> GetordersByOrderNumber( Guid orderNumber)
        {
            var userId = AbpSession.GetUserId();

            var query = _repository.GetAll()
                .Include(x => x.Food)
                .ThenInclude(x => x.Category)
                .Include(x => x.OrderStatus)
                .Where(x => x.UserId == userId && x.OrderNumber == orderNumber && x.OrderStatusId == 2)
                .ToList();

            return ObjectMapper.Map<List<OrderDto>>(query);
        }

        public async Task<double> GetTotalSales (DateTime DateFrom, DateTime DateTo)
        {
            var sales = await _repository.GetAll()
                .Where(x => x.DateTimeOrdered >= DateFrom && x.DateTimeOrdered <= DateTo)
                .SumAsync(x => x.TotalAmount);

            return sales;
        }
        public async Task<double> GetTotalPurchase (DateTime DateFrom, DateTime DateTo)
        {
            var userId = AbpSession.GetUserId();
            var sales = await _repository.GetAll()
                .Where(x => x.DateTimeOrdered >= DateFrom && x.DateTimeOrdered <= DateTo && x.UserId == userId)
                .SumAsync(x => x.TotalAmount);

            return sales;
        }
        private bool IsWorkingDays(DateTime date)
        {
            return date.DayOfWeek != DayOfWeek.Saturday || date.DayOfWeek != DayOfWeek.Sunday;
        }

    }
}