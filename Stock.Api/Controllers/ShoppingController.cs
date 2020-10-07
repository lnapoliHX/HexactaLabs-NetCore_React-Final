using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Stock.Api.DTOs;
using Stock.Api.Extensions;
using Stock.AppService.Services;
using Stock.Model.Entities;

namespace Stock.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/shopping")]
    [ApiController]
    public class ShoppingController : ControllerBase
    {
        private ShoppingService shoppingService;
        private ProductService productService;
        private readonly IMapper mapper;

        public ShoppingController(ShoppingService shoppingService, ProductService productService, IMapper mapper)
        {
            this.shoppingService = shoppingService;
            this.productService = productService;
            this.mapper = mapper;
        }

        /// <summary>
        /// Permite crear una nueva instancia
        /// </summary>
        /// <param name="value">Una instancia</param>
        [HttpPost]
        public ActionResult Post([FromBody] ShoppingDTO value)
        {
            TryValidateModel(value);

            try
            {
                var shopping = this.mapper.Map<Shopping>(value);
                decimal totalPrice = 0;
                List<Product> productList = new List<Product>();
                foreach(Product product in shopping.Products){
                    Product productUpdated = this.productService.Get(product.Id);
                    if(productUpdated.Stock >= product.Cant){
                        productList.Add(product);
                        totalPrice = totalPrice + (product.Cant * product.SalePrice);
                        this.productService.DescontarStock(product.Id, product.Cant);
                    }
                }
                if(productList.Count==0){
                    return Ok(new { Success = false, Message = "Ningún producto seleccionado tiene stock disponible" });
                }
                shopping.TotalPrice = totalPrice;
                shopping.Products = productList;
                this.shoppingService.Create(shopping);
                value = this.mapper.Map<ShoppingDTO>(shopping);
                return Ok(new { Success = true, Message = "", data = value });
            }
            catch
            {
                return Ok(new { Success = false, Message = "Los productos no están disponibles" });
            }
        }

        /// <summary>
        /// Permite recuperar todas las instancias
        /// </summary>
        /// <returns>Una colección de instancias</returns>
        [HttpGet]
        public ActionResult<IEnumerable<ShoppingDTO>> Get()
        {
            try
            {
                var result = this.shoppingService.GetAll();
                return this.mapper.Map<IEnumerable<ShoppingDTO>>(result).ToList();
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        /// <summary>
        /// Permite recuperar una instancia mediante un identificador
        /// </summary>
        /// <param name="id">Identificador de la instancia a recuperar</param>
        /// <returns>Una instancia</returns>
        [HttpGet("{id}")]
        public ActionResult<ShoppingDTO> Get(string id)
        {
            try
            {
                var result = this.shoppingService.Get(id);
                return this.mapper.Map<ShoppingDTO>(result);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        /// <summary>
        /// Permite borrar una instancia
        /// </summary>
        /// <param name="id">Identificador de la instancia a borrar</param>
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            try {
                var shopping = this.shoppingService.Get(id);
                this.shoppingService.Delete(shopping);
                return Ok(new { Success = true, Message = "", data = id });
            } catch {
                return Ok(new { Success = false, Message = "", data = id });
            }
        }

    }
}