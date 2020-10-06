using Stock.AppService.Base;
using Stock.Model.Entities;
using Stock.Repository.LiteDb.Interface;

namespace Stock.AppService.Services
{
    public class OrderService : BaseService<Order>
    {
        public OrderService(IRepository<Order> repository) : base(repository)
        {    
              
        }

    }
}