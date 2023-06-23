using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Entities
{
    public class Customer : FullAuditedEntity<int>
    {
        public string Name { get; set; }
        public int? DivisionId { get; set; }
        public Division Division { get; set; }
    }
}
