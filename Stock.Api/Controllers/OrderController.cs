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
    [Route("api/order")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly OrderService service;
        private readonly ProductService productService;
        private readonly IMapper mapper;

        public OrderController(OrderService service, ProductService productService, IMapper mapper)
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
        public ActionResult<IEnumerable<OrderDTO>> Get()
        {
            try
            {
                var result = this.service.GetAll();
                return this.mapper.Map<IEnumerable<OrderDTO>>(result).ToList();
            }
            catch(Exception)
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
        public ActionResult<OrderDTO> Get(string id)
        {
            return this.mapper.Map<OrderDTO>(this.service.Get(id));
        }

        /// <summary>
        /// Permite crear una nueva instancia
        /// </summary>
        /// <param name="value">Una instancia</param>
        [HttpPost]
        public ActionResult Post([FromBody] OrderDTO value)
        {
            TryValidateModel(value);

            try {
                var order = this.mapper.Map<Order>(value);
                order.Quantity = new Dictionary<string, int>();
                this.service.Create(order);
                value.Id = order.Id;
                return Ok(new { Success = true, Message = "", data = value });
            } catch (Exception e) {
                string errorMessage = e.Message;
                return Ok(new { Success = false, Message = "", data = errorMessage});

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
                var order = this.service.Get(id);
                this.service.Delete(order);
                return Ok(new { Success = true, Message = "", data = id });
            } catch {
                return Ok(new { Success = false, Message = "", data = id });
            }
        }

        /// <summary>
        /// Permite agregar un producto y una cantidad seleccionada a la orden actual
        /// </summary>
        /// <param name="orderId">Identificador de la orden</param>
        /// <param name="productId">Identificador del producto</param>
        /// <param name ="quantity">Cantidad seleccionada del producto</param>

        [HttpPost("addProduct/{orderId}")]
        public ActionResult agregarProducto(string orderId, string productId, int quantity)
        {
            Order order = this.service.Get(orderId);        
            order.Quantity.Add(productId,quantity);
            this.service.Update(order);
            return Ok(new { Success = true, Message = "", data = orderId });
        }

    }
}