using Abp.AutoMapper;
using OrderingSystem.Entities;
using OrderingSystem.Foods.Dto;
using OrderingSystem.OrderStatuses.Dto;
using OrderingSystem.Users.Dto;
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
        public int? FoodId { get; set; }
        public int Quantity { get; set; }
        public string? Size { get; set; }
        public string? Notes { get; set; }
        public DateTime? DateTimeOrdered { get; set; }
        public DateTime DateTimeAddedToCart { get; set; }
        public double? TotalAmount { get; set; }
        public int? OrderStatusId { get; set; }
        public Guid? OrderNumber { get; set; }
        public long? UserId { get; set; }
    }
}
