using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Entities
{
    public class Order : FullAuditedEntity<int>
    {
        public int? CustomerId { get; set; }
        public Customer Customer { get; set; }
        public int? FoodId { get; set; }
        public Food Food { get; set; }
        public string? Notes { get; set; }
        public DateTime DateTimeOrdered { get; set; }
        public int? OrderStatusId { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public double? Amount { get; set; }
    }
}