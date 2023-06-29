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
        public string CustomerName { get; set; }
        public int FoodId { get; set; }
        public string FoodName { get; set; }
        public int Quantity { get; set; }
        public string Size { get; set; }
        public string? Notes { get; set; }
        public DateTime DateTimeOrdered { get; set; }
        public bool OrderStatus { get; set; }
    }
}
