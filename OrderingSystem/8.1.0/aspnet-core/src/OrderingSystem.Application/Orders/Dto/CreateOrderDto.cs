﻿using Abp.AutoMapper;
using OrderingSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Orders.Dto
{
    [AutoMapTo(typeof(Order))]
    public class CreateOrderDto
    {
        public int FoodId { get; set; }
        public int Quantity { get; set; }
        public string? Size { get; set; }
        public string? Notes { get; set; }
        public DateTime? DateTimeOrdered { get; set; }
        public int? OrderStatusId { get; set; }
        public double? TotalAmount { get; set; }
        public long UserId { get; set; }
        public Guid? OrderNumber { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public DateTime DateTimeAddedInCart { get; set; }
    }
}
