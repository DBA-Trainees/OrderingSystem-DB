using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystem.Customers.Dto;
using OrderingSystem.Entities;
using OrderingSystem.Foods.Dto;
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
        public string CustomerName { get; set; }
        public CustomerDto Customer { get; set; }
        public int? FoodId { get; set; }
        public string FoodName { get; set; }
        public int Quantity { get; set; }
        public string Size { get; set; }
        public FoodDto Food { get; set; }
        public string? Notes { get; set; }
        public DateTime DateTimeOrdered { get; set; }
        public bool OrderStatus { get; set; }
    }
}
