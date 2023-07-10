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
    public class CreateDivisionDto
    {        
        public string Name { get; set; }
    }
}
