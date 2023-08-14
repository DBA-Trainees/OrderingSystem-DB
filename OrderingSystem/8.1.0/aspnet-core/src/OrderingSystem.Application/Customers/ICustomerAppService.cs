using Abp.Application.Services;
using OrderingSystem.Customers.Dto;
using OrderingSystem.Entities;
using OrderingSystem.Users.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Customers
{
    public interface ICustomerAppService : IAsyncCrudAppService <CustomerDto, int, PagedCustomerResultRequestDto, CreateCustomerDto, CustomerDto>
    {
        Task<int> GetCustomerCount();
    }
}
