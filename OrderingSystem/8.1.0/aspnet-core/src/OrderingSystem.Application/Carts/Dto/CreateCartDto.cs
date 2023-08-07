using Abp.AutoMapper;
using OrderingSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Carts.Dto
{
    [AutoMapTo(typeof(Cart))]
    public class CreateCartDto
    {
        public int FoodId { get; set; }
        public int Quantity { get; set; }
        public string? Size { get; set; }
        public DateTime DateTimeAddedInCart { get; set; }
        public double? Amount { get; set; }
        public int? OrderStatusId { get; set; }
        public long? UserId { get; set; }
    }
}
