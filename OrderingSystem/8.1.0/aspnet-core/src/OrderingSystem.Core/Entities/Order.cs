using Abp.Authorization.Users;
using Abp.Domain.Entities.Auditing;
using OrderingSystem.Authorization.Roles;
using OrderingSystem.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Entities
{
    public class Order : FullAuditedEntity<int>
    {
        public int? FoodId { get; set; }
        public Food Food { get; set; }
        public string? Notes { get; set; }
        public DateTime? DateTimeOrdered { get; set; }
        public double? TotalAmount { get; set; }
        public long? UserId { get; set; }
        public User User { get; set; }
        public int Quantity { get; set; }
        public string Size { get; set; }
        public Guid? OrderNumber { get; set; }
        public int? OrderStatusId { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public DateTime? LastModificationTime { get; set; }
        
    }
}