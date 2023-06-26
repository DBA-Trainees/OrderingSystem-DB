using Abp.Application.Services.Dto;
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
    [AutoMapFrom(typeof(Category))]
    public class CategoryDto : EntityDto<int>
    {
        public string Name { get; set; }
    }
}
