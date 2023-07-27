using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystem.Divisions.Dto;
using OrderingSystem.Entities;
using OrderingSystem.Roles.Dto;
using OrderingSystem.Users.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Customers.Dto
{
    [AutoMapTo(typeof(Customer))]
    [AutoMapFrom(typeof(Customer))]
    public class CustomerDto : EntityDto<int>
    {
        public int DivisionId { get; set; }
        public DivisionDto Division { get; set; }
        public long UserId { get; set; }
        public UserDto User { get; set; }
    }
}
