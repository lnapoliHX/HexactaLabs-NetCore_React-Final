using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Microsoft.Extensions.Options;
using Stock.AppService.Base;
using Stock.Model.Entities;
using Stock.Repository.LiteDb.Interface;
using Stock.Settings;

namespace Stock.AppService.Services
{
    public class CompraService : BaseService<Compra>
    {

        public CompraService(IRepository<Compra> repository)
            : base(repository)
        {

        }

        public Compra ObtenerCompra(string idCompra)
        {
            var compra = this.Repository.GetById(idCompra);
            return compra;
        }

        public IEnumerable<Compra> Search(Expression<Func<Compra, bool>> filter)
        {
            return this.Repository.List(filter);
        }
    }
}
