using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Orders.Dto
{
    public class OrderNumberDto: EntityDto<int>
    {
        public Guid OrderNumbers { get; set; }
        public int OrderId { get; set; }
        public int FoodId { get; set; }
        public long? UserId { get; set; }
    }
}
