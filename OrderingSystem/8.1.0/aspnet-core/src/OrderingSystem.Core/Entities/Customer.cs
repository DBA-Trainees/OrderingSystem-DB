using Abp.Authorization.Users;
using Abp.Domain.Entities.Auditing;
using OrderingSystem.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Entities
{
    public class Customer : FullAuditedEntity<int>
    {
        public int? DivisionId { get; set; }
        public Division Division { get; set; }
        public User User { get; set; }
        public UserRole Role { get; set; }
    }
}
