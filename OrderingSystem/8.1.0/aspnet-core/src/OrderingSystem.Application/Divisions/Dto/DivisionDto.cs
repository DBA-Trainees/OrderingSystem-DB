using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Divisions.Dto
{
    [AutoMapTo(typeof(Division))]
    [AutoMapFrom(typeof(Division))]
    public class DivisionDto: EntityDto<int>
    {        
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
