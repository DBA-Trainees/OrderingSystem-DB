using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystem.Categories.Dto;
using OrderingSystem.Entities;
using OrderingSystem.Types.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Foods.Dto
{
    [AutoMapTo(typeof(Food))]
    [AutoMapFrom(typeof(Food))]
    public class FoodDto : EntityDto<int>
    {
        public byte[] Image { get; set; }
        public string ImageName { get; set; }
        public string ImageFileType { get; set; }
        public string Name { get; set; }
        public bool Availability { get; set; }
        public int Quantity { get; set; }
        public int CategoryId { get; set; }
        public CategoryDto Category { get; set; }
        public int TypeId { get; set; }
        public TypeDto Type { get; set; }
        public string? Size { get; set; }
        public double Price { get; set; }
    }
}
