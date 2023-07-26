using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using OrderingSystem.Authorization.Roles;
using OrderingSystem.Authorization.Users;
using OrderingSystem.Customers.Dto;
using OrderingSystem.Divisions.Dto;
using OrderingSystem.Entities;
using OrderingSystem.Roles.Dto;
using OrderingSystem.Users.Dto;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderingSystem.Customers
{
    public class CustomerAppService : AsyncCrudAppService<Customer, CustomerDto, int, PagedCustomerResultRequestDto, CreateCustomerDto, CustomerDto>, ICustomerAppService
    {
        private readonly IRepository<Customer, int> _repository;
        private readonly IRepository<User, long> _userRepository;
        private readonly IRepository<Role> _roleRepository;
        public CustomerAppService(IRepository<Customer, int> repository, IRepository<User, long> userRepository, IRepository<Role> roleRepository) : base(repository)
        {
            _repository = repository;
            _userRepository = userRepository;
            _roleRepository = roleRepository;
        }

        public override Task<CustomerDto> CreateAsync(CreateCustomerDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
        }

        public override async Task<PagedResultDto<CustomerDto>> GetAllAsync(PagedCustomerResultRequestDto input)
        {
            var customer = await _repository.GetAll()
                .Include(x => x.Division)
                .Include(x => x.Role)
                .Include(x => x.User)
                .OrderByDescending(x => x.Id)
                .Select(x => ObjectMapper.Map<CustomerDto>(x))
                .ToListAsync();

            return new PagedResultDto<CustomerDto>(customer.Count(), customer);
        }

        public override Task<CustomerDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }

        public override Task<CustomerDto> UpdateAsync(CustomerDto input)
        {
            return base.UpdateAsync(input);
        }

        protected override Task<Customer> GetEntityByIdAsync(int id)
        {
            return base.GetEntityByIdAsync(id);
        }

        //public async Task<List<UserDto>> GetAllCustomerUserRole()
        //{
        //    var user = await _userRepository.GetAll()
        //        .Include(x =>x.FullName)
        //        .Include(x =>x.Roles)
        //        .ToListAsync();

        //    return ObjectMapper.Map<List<UserDto>>(user);
        //}

        public async Task<PagedResultDto<UserDto>> GetAllCustomerFromUser(PagedCustomerResultRequestDto input)
        {
            var customer = await _repository.GetAll()
                .Include(x => x.Role)
                .Include(x => x.User)
                .OrderByDescending(x => x.Id)
                .Where(x => x.Role.Id == 4)
                .Select(x => ObjectMapper.Map<UserDto>(x))
                .ToListAsync();

            return new PagedResultDto<UserDto>(customer.Count(), customer);
        }
    }
}
