using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystem.Customers.Dto;
using OrderingSystem.Entities;
using OrderingSystem.Foods.Dto;
using OrderingSystem.OrderStatuses.Dto;
using OrderingSystem.Roles.Dto;
using OrderingSystem.Users.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Orders.Dto
{
    [AutoMapTo(typeof(Order))]
    [AutoMapFrom(typeof(Order))]
    public class OrderDto : EntityDto<int>
    {
        public int? CustomerId { get; set; }
        public CustomerDto Customer { get; set; }
        public int? FoodId { get; set; }
        public FoodDto Food { get; set; }
        public string? Notes { get; set; }
        public DateTime DateTimeOrdered { get; set; }
        public int? OrderStatusId { get; set; }
        public OrderStatusDto OrderStatus { get; set; }
        public double? Amount { get; set; }
        public long UserId { get; set; }
        public UserDto User { get; set; }
        public long? RoleId { get; set; }
        public RoleDto Role { get; set; }
    }
}
