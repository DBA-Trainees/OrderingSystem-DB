using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystem.Divisions.Dto;
using OrderingSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Customers.Dto
{
    public class CustomerDto : EntityDto<int>
    {
        [AutoMapTo(typeof(Customer))]
        [AutoMapFrom(typeof(Customer))]

        public int Id { get; set; }
        public string Name { get; set; }
        public int DivisionId { get; set; }
        public DivisionDto Division { get; set; }
    }
}
