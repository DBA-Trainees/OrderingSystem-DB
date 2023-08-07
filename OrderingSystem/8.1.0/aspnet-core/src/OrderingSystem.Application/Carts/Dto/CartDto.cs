using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystem.Authorization.Users;
using OrderingSystem.Entities;
using OrderingSystem.Foods.Dto;
using OrderingSystem.OrderStatuses.Dto;
using OrderingSystem.Users.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Carts.Dto
{
    [AutoMapTo(typeof(Cart))]
    [AutoMapFrom(typeof(Cart))]
    public class CartDto: EntityDto<int>
    {
        public int Id { get; set; }
        public int? FoodId { get; set; }
        public int Quantity { get; set; }
        public string? Size { get; set; }
        public FoodDto Food { get; set; }
        public DateTime DateTimeAddedInCart { get; set; }
        public double? Amount { get; set; }
        public int? OrderStatusId { get; set; }
        public OrderStatusDto OrderStatus { get; set; }
        public long UserId { get; set; }
        public UserDto User { get; set; }
    }
}
