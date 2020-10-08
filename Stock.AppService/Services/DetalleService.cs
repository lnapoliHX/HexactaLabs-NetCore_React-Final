using Stock.AppService.Base;
using Stock.Model.Entities;
using Stock.Repository.LiteDb.Interface;
using System.Linq.Expressions;
using System;
using System.Collections.Generic;

namespace Stock.AppService.Services
{
    public class DetalleService : BaseService<Detalle>
    {
        public DetalleService(IRepository<Detalle> repository)
            : base(repository)
        {
        }

        public IEnumerable<Detalle> Search(Expression<Func<Detalle, bool>> filter)
        {
            return this.Repository.List(filter);
        }
    }
}
