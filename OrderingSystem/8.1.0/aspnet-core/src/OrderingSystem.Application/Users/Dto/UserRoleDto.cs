using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystem.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Users.Dto
{
    [AutoMapFrom(typeof(User))]
    public class UserRoleDto: EntityDto<long>
    {
        public long UserId { get; set; }
        public int Tenantid { get; set; }
    }
}
