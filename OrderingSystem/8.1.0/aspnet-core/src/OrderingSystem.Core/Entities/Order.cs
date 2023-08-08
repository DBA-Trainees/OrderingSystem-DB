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
        public int? CartId { get; set; }
        public Cart Cart { get; set; }
        public string? Notes { get; set; }
        public DateTime? DateTimeOrdered { get; set; }
        public double? TotalAmount { get; set; }
        public int? OrderStatusId { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public ICollection<Cart> Carts { get; set; }
    }
}