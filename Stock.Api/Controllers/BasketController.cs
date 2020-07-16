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
    [Produces("application/json")]
    [Route("api/basket")]
    [ApiController]
    public class BasketController: ControllerBase
    {
        private readonly BasketService service;
        private readonly ProductService productService;
        private readonly IMapper mapper;
           
        public BasketController(BasketService service, ProductService productService, IMapper mapper)
        {
            this.service = service;
            this.productService = productService;
            this.mapper = mapper;
        }
        /// <summary>
        /// Permite recuperar todas las instancias
        /// </summary>
        /// <returns>Una colección de instancias</returns>
        [HttpGet]
        public ActionResult<IEnumerable<BasketDTO>> Get()
        {
            return this.mapper.Map<IEnumerable<BasketDTO>>(this.service.GetAll()).ToList();
        }

        /// <summary>
        /// Permite crear una nueva instancia
        /// </summary>
        /// <param name="value">Una instancia</param>
        [HttpPost]
        public ActionResult Post([FromBody] BasketDTO value)
        {
            TryValidateModel(value);

            try {
                var basket = this.mapper.Map<Basket>(value);
                basket.Product = this.productService.Get(value.ProductId.ToString());
                this.service.Create(basket);
                value.Id = basket.Id;
                return Ok(new { Success = true, Message = "", data = value });
            } catch {
                return Ok(new { Success = false, Message = "The name is already in use" });
            }
        }


        }
}