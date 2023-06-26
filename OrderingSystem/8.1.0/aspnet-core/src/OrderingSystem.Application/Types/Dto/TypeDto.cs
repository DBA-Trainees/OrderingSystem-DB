using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Types.Dto
{
    [AutoMapTo(typeof(Type))]
    [AutoMapFrom(typeof(Type))]
    public class TypeDto : EntityDto<int>
    {
        public string Name { get; set; }
    }
}
