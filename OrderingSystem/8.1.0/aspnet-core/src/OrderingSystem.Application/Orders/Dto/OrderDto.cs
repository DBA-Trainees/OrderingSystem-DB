﻿using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystem.Authorization.Users;
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
        public int Id { get; set; }
        public int FoodId { get; set; }
        public int Quantity { get; set; }
        public string? Size { get; set; }
        public FoodDto Food { get; set; }
        public string? Notes { get; set; }
        public DateTime? DateTimeOrdered { get; set; }
        public DateTime? DateTimeAddedToCart { get; set; }
        public double TotalAmount { get; set; }
        public int? OrderStatusId { get; set; }
        public OrderStatusDto OrderStatus { get; set; }
        public Guid? OrderNumber { get; set; }
        public long? UserId { get; set; }
        public UserDto User { get; set; }
        public List<OrderDto> Orders { get; set; }
        public List<OrderNumberDto> OrderNumberList { get; set; }
    }
}
