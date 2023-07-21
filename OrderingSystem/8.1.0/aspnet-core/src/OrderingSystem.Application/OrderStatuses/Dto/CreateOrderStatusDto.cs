using Abp.AutoMapper;
using OrderingSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.OrderStatuses.Dto
{
    [AutoMapTo(typeof(OrderStatus))]
    public class CreateOrderStatusDto
    {
        public string Name { get; set; }
    }
}
