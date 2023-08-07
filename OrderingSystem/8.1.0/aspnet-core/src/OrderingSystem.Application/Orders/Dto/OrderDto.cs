using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystem.Carts.Dto;
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
        public int? CartId { get; set; }
        public CartDto Cart { get; set; }
        public string? Notes { get; set; }
        public DateTime DateTimeOrdered { get; set; }
        public double? TotalAmount { get; set; }
        public int? OrderStatusId { get; set; }
        public OrderStatusDto OrderStatus { get; set; }
    }
}
