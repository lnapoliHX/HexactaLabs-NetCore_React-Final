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
    public class BasketService: BaseService<Basket>
    {
             public BasketService(IRepository<Basket> repository)
            : base(repository)
        {
        }   
    }
}