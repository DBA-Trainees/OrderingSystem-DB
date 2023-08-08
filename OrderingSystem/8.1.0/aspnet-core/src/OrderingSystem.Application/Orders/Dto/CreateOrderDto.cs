using Abp.AutoMapper;
using OrderingSystem.Carts.Dto;
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
        public int CartId { get; set; }
        public string? Notes { get; set; }
        public DateTime DateTimeOrdered { get; set; }
        public double TotalAmount { get; set; }
        public int? OrderStatusId { get; set; }
        public List<CreateCartDto> Carts { get; set; } = new List<CreateCartDto>();
    }
}
