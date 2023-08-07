using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using Microsoft.EntityFrameworkCore;
using OrderingSystem.Authorization.Users;
using OrderingSystem.Carts.Dto;
using OrderingSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Carts
{
    public class CartAppService : AsyncCrudAppService<Cart, CartDto, int, PagedCartResultRequestDto, CreateCartDto, CartDto>
    {
        private readonly IRepository<Cart, int> _repository;
        private readonly IRepository<Food, int> _foodRepository;
        private readonly IRepository<User, long> _userRepository;
        public CartAppService(
            IRepository<Cart, int> repository, 
            IRepository<Food,int> foodRepository, 
            IRepository<User, long> userRepository
            ) : base(repository)
        {
            _repository = repository;
            _foodRepository = foodRepository;
            _userRepository = userRepository;
        }

        public override async Task<CartDto> CreateAsync(CreateCartDto input)
        {
            var userId = AbpSession.GetUserId();
            var cart = ObjectMapper.Map<Cart>(input);

            cart.DateTimeAddedInCart = input.DateTimeAddedInCart.ToLocalTime();

            cart.FoodId = input.FoodId;
            cart.UserId = userId;

            cart.OrderStatusId = 1;

            cart = await _repository.InsertAsync(cart);

            return ObjectMapper.Map<CartDto>(cart);

        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
        }

        public override async Task<PagedResultDto<CartDto>> GetAllAsync(PagedCartResultRequestDto input)
        {
            var cart = await _repository.GetAll()
                .Include(x => x.Food)
                .Include(x => x.User)
                .Include(x => x.OrderStatus)
                .OrderByDescending(x => x.Id)
                .Select(x => ObjectMapper.Map<CartDto>(x))
                .ToListAsync();

            return new PagedResultDto<CartDto>(cart.Count(), cart);
        }

        public override Task<CartDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }

        public override async Task<CartDto> UpdateAsync(CartDto input)
        {
            var userId = AbpSession.GetUserId();
            var cart = ObjectMapper.Map<Cart>(input);

            cart.FoodId = input.FoodId;
            cart.UserId = userId;

            await _repository.UpdateAsync(cart);
            return ObjectMapper.Map<CartDto>(cart);
        }

        public async Task<PagedResultDto<CartDto>> GetAllOrderInCart(PagedCartResultRequestDto input)
        {
            var userId = AbpSession.GetUserId();

            var cart = await _repository.GetAll()
                .Include(x => x.Food)
                .ThenInclude(x => x.Category)
                .Include(x => x.User)
                .Include(x => x.OrderStatus)
                .Where(x => x.UserId == userId)
                .OrderByDescending(x => x.DateTimeAddedInCart)
                .Select(x => ObjectMapper.Map<CartDto>(x))
                .ToListAsync();

            return new PagedResultDto<CartDto>(cart.Count(), cart);
        }

        public async Task<CartDto> UpdateAddToCart(CartDto input)
        {
            var userId = AbpSession.GetUserId();
            var cart = ObjectMapper.Map<Cart>(input);
            var existingFoodCart = await _repository
                .FirstOrDefaultAsync(
                o => o.FoodId == input.FoodId && o.UserId == userId
            );

            if (existingFoodCart != null)
            {
                existingFoodCart.Quantity += input.Quantity;
                existingFoodCart.DateTimeAddedInCart = input.DateTimeAddedInCart.ToLocalTime();
                existingFoodCart.Size = input.Size;

                await _repository.UpdateAsync(existingFoodCart);
                return ObjectMapper.Map<CartDto>(existingFoodCart);
            }
            else
            {
                cart = ObjectMapper.Map<Cart>(input);
                cart.FoodId = input.FoodId;
                cart.UserId = userId;
                cart.OrderStatusId = 1;
                await _repository.InsertAsync(cart);
                return ObjectMapper.Map<CartDto>(cart);
            }
        }
        public async Task<List<CartDto>> GetAllCartOrders(int cartId)
        {
            var cart = await _repository.GetAll()
                .Where(x => x.Id == cartId)
                .ToListAsync();
            return ObjectMapper.Map<List<CartDto>>(cart);
        }
    }
}
