using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Microsoft.Extensions.Options;
using Stock.AppService.Base;
using Stock.Model.Entities;
using Stock.Repository.LiteDb.Interface;

namespace Stock.AppService.Services
{
    public class ShoppingService : BaseService<Shopping>
    {
        public ShoppingService(IRepository<Shopping> repository) : base(repository)
        {    
              
        }

        public new Shopping Create(Shopping entity)
        {
                return base.Create(entity);
        }
    }
}