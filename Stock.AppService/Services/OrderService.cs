using System;
using System.Collections.Generic;
using System.Linq.Expressions;
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

        public new Order Create(Order entity)
        {
            DateTime utcDate = DateTime.UtcNow;

            entity.DateTime = utcDate.ToString("s");

            return base.Create(entity);

        }

        public IEnumerable<Order> GetOrdersByCustomerId(string id) 
        {
            return this.Repository.List(x => x.CustomerId.Equals(id));
        }

        public IEnumerable<Order> Search(Expression<Func<Order, bool>> filter)
        {
            return this.Repository.List(filter);
        }
    }
}