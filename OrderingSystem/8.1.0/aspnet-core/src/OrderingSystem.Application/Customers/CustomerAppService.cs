using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using OrderingSystem.Customers.Dto;
using OrderingSystem.Entities;
using System.Linq;
using System.Threading.Tasks;

namespace OrderingSystem.Customers
{
    public class CustomerAppService : AsyncCrudAppService<Customer, CustomerDto, int, PagedCustomerResultRequestDto, CreateCustomerDto, CustomerDto>, ICustomerAppService
    {
        private readonly IRepository<Customer, int> _repository;
        public CustomerAppService(IRepository<Customer, int> repository) : base(repository)
        {
            _repository = repository;
        }

        public override async Task<PagedResultDto<CustomerDto>> GetAllAsync(PagedCustomerResultRequestDto input)
        {
            var customer = await _repository.GetAll()
                .Include(x => x.Division)
                .OrderByDescending(x => x.Id)
                .Select(x => ObjectMapper.Map<CustomerDto>(x))
                .ToListAsync();

            return new PagedResultDto<CustomerDto>(customer.Count(), customer);
        }
    }
}
