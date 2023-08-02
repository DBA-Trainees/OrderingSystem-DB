using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Orders.Dto
{
    [AutoMapFrom(typeof(OrderDto))]
    public class ConfirmedOrderDto
    {
        public int? Id { get; set; }
        public int? FoodId { get; set; }
        public int? UserId { get; set; }
        public int Quantity { get; set; }
        public string Size { get; set; }
        public int? OrderStatusId { get; set; }
        public string? Notes { get; set; }
        public double? TotalAmount { get; set; }
        public DateTime DateTimeOrdered { get; set; }
    }
}
