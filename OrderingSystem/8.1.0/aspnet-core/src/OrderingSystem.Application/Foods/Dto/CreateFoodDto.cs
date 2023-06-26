using Abp.AutoMapper;
using OrderingSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Foods.Dto
{
    [AutoMapTo(typeof(Food))]
    public class CreateFoodDto
    {
        public byte[] Image { get; set; }
        public string ImageType { get; set; }
        public string Name { get; set; }
        public bool Availability { get; set; }
        public int Quantity { get; set; }
        public int? CategoryId { get; set; }
        public int? TypeId { get; set; }
        public string? Size { get; set; }
        public double Price { get; set; }
    }
}
