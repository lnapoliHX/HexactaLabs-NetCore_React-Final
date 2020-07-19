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
        public string Comprar(ProductService productService)
        {
            var detalle = "";
            foreach (var item in this.GetAll())
            {
                if (productService.ObtenerStock(item.Product.Id) >= item.Quantity)
                {
                    item.Product.DescontarStock(item.Quantity);
                    detalle += "Producto: "+item.Product.Name +"\n";
                    detalle += "Precio: "+item.Quantity * productService.ObtenerPrecioVentaPublico(item.Product.Id) +"\n";
                    Delete(item);
                }
            }
            return detalle;
        }

        public decimal SumarMonto(ProductService productService){
            decimal total = 0;
            foreach (var item in this.GetAll())
            {
                total = total + (productService.ObtenerPrecioVentaPublico(item.Product.Id) * item.Quantity);
            }
            return total;
        }

    }
}