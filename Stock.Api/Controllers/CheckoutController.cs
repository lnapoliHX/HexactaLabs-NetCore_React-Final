using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Stock.Api.DTOs;
using Stock.AppService.Services;
using Stock.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Stock.Api.Extensions;


namespace Stock.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckoutController : ControllerBase
    {
        private readonly ProductService productService;
        private readonly ProductTypeService productTypeService;
        private readonly IMapper mapper;

        public CheckoutController(ProductService service, ProductTypeService productTypeService, IMapper mapper)
        {
            this.productService = service;
            this.productTypeService = productTypeService;
            this.mapper = mapper;
        }

        // GET: api/<CheckoutController>
        [HttpPost]
        public ActionResult Post([FromBody] CheckoutDTO[] value)
        {
            TryValidateModel(value);
            var productosVendidos = new List<CheckoutDTO>();
            try
            {
                foreach(CheckoutDTO ch in value)
                {
                    if(this.productService.DescontarStock(ch.Id, ch.PurchaseQuantity))
                    {
                        var producto = this.productService.Get(ch.Id);
                        ch.Name = producto.Name;
                        ch.salePrice = producto.SalePrice;
                        productosVendidos.Add(ch);
                    } 
                }
                //var product = this.mapper.Map<Product>(value);
                //product.ProductType = this.productTypeService.Get(value.ProductTypeId.ToString());
                //this.productService.Create(product);
                //value.Id = product.Id;
                return Ok(new { Success = true, Message = "", data = productosVendidos });
            }
            catch
            {
                return Ok(new { Success = false, Message = "The name is already in use" });
            }
        }

    }
}
