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
        public Customer Customer { get; set; }
        public Food Food { get; set; }
        public string? Notes { get; set; }
        public DateTime DateTimeOrdered { get; set; }
        public double? TotalAmount { get; set; }
        public User User { get; set; }
        public UserRole Role { get; set; }
    }
}