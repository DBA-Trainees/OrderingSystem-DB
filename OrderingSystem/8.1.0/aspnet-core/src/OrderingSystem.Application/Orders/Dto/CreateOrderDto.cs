using Abp.AutoMapper;
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
        public int CustomerId { get; set; }
        public int FoodId { get; set; }
        public string? Notes { get; set; }
        public DateTime DateTimeOrdered { get; set; }
        public int? OrderStatusId { get; set; }
        public double? Amount { get; set; }
        public long UserId { get; set; }
        public long? RoleId { get; set; }
    }
}
