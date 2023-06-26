using Abp.AutoMapper;
using OrderingSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Categories.Dto
{
    [AutoMapTo(typeof(Category))]
    public class CreateCategoryDto
    {
        public string Name { get; set; }
    }
}
