using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Stock.Api.DTOs;
using Stock.Api.Extensions;
using Stock.AppService.Services;
using Stock.Model.Entities;

namespace Stock.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/order")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private OrderService service;
        private ProductService productService;
        private readonly IMapper mapper;

        public OrderController(OrderService service, ProductService productService, IMapper mapper)
        {
            this.service = service;
            this.productService = productService;
            this.mapper = mapper;
        }

        private void InitUpdateStock(Order order) 
        {
            foreach (OrderItem orderItem in order.Items)
            {
                orderItem.StockUpdated = false;
            }
        }

        private Order MapToOrder(OrderDTO orderData) 
        {
            var order = this.mapper.Map<Order>(orderData);

            foreach (OrderItemDTO orderItemData in orderData.Items)
            {
                var orderItem = this.mapper.Map<OrderItem>(orderItemData);

                order.addItem(orderItem);
            }

            return order;
        }

        private Order MapToVerifiedOrder(OrderDTO orderData) 
        {
            var order = this.mapper.Map<Order>(orderData);

            foreach (OrderItemDTO orderItemData in orderData.Items)
            {
                var orderItem = this.mapper.Map<OrderItem>(orderItemData);

                var product = productService.Get(orderItemData.ProductId.ToString());

                if (product.Stock > 0 && orderItem.Quantity > 0)
                {                   
                    if (product.Stock >= orderItemData.Quantity)
                    {
                        orderItem.Quantity = orderItemData.Quantity;                         
                        order.addItem(orderItem);

                    }
                    else
                    {
                        orderItem.Quantity = product.Stock;
                        order.addItem(orderItem);
                    }
                    orderItem.StockUpdated = false;
                }
            }

            return order;
        }

        private bool UpdateStock(Order order, string op)
        {
            if (op != "ADD_STOCK" && op != "DISCOUNT_STOCK")
            {
                return false;
            }

            List<string> updatedProducts = new List<string>();

            try
            {
                foreach (OrderItem orderItem in order.Items)
                {
                    var product = productService.Get(orderItem.ProductId.ToString());

                    if (op == "ADD_STOCK") 
                    {
                        product.AddStock(orderItem.Quantity);
                    }
                    else if (op == "DISCOUNT_STOCK")
                    {
                        product.DiscountStock(orderItem.Quantity);
                    }

                    productService.Update(product);

                    orderItem.StockUpdated = true;
                }

                return true;
            }
            catch
            {
                throw;
            }
        }

        /// <summary>
        /// Permite agregar una nueva Orden al repositorio
        /// </summary>
        /// <param name="orderData">Propiedades de la Orden</param>
        /// <returns>Exito o Error y la Orden que se intentó crear</returns>
        [HttpPost]
        public ActionResult Post([FromBody] OrderDTO orderData)
        {
            TryValidateModel(orderData);

            try
            {
                var order = this.MapToVerifiedOrder(orderData);

                this.service.Create(order);
                orderData.Id = order.Id;

                this.UpdateStock(order, "DISCOUNT_STOCK");

                this.service.Update(order);
              
                return Ok(new { Success = true, Message = "Order Created!",
                                requestedOrder = orderData, 
                                resultOrder = this.mapper.Map<OrderDTO>(order) });
            }
            catch
            {
                return Ok(new { Success = false, 
                                Message = "Error creating the Order!!!", 
                                requestedOrder = orderData });
            }
        }

        /// <summary>
        /// Permite recuperar todas las Ordenes existentes en el repositorio
        /// </summary>
        /// <returns>Una colección de Ordenes o un código en caso de error</returns>
        [HttpGet]
        public ActionResult<IEnumerable<OrderDTO>> Get()
        {
            try
            {
                var result = this.service.GetAll();
                //return Ok(new {Success = true, Message = "List of all Orders", 
                //                Orders = result} );
                return Ok(new {Success = true, Message = "List of all Orders", 
                                Orders = this.mapper.Map<IEnumerable<OrderDTO>>(result).ToList()} );
            }
            catch (Exception)
            {
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }

        /// <summary>
        /// Permite recuperar las propiedades de una Orden mediante su Id
        /// </summary>
        /// <param name="id">Identificador de la Orden a recuperar</param>
        /// <returns>Una instancia de Orden o un código en caso de error</returns>
        [HttpGet("{id}")]
        public ActionResult<OrderDTO> Get(string id)
        {
            try
            {
                var result = this.service.Get(id);
                return Ok(new { Success = true, Message = "Order Obtained!", 
                        resultOrder = this.mapper.Map<OrderDTO>(result) });
            }
            catch (Exception)
            {
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }

        /// <summary>
        /// Permite actualizar las propiedades de una Orden
        /// </summary>
        /// <param name="id">Identificador de la Orden a actualizar</param>
        /// <param name="orderData">Propiedades de la Orden</param>
        /// <returns>Exito o Error y la Orden que se intentó actualizar</returns>
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] OrderDTO orderData)
        {
            TryValidateModel(orderData);

            try
            {
                var oldOrder = this.service.Get(id);

                // Set to false OrderItem.StockUpdated
                this.InitUpdateStock(oldOrder);
                // Update oldOrder with Items.StockUpdated in false
                this.service.Update(oldOrder);
                // Add Quantities of oldOrder items to Stock
                this.UpdateStock(oldOrder, "ADD_STOCK");
                // Update oldOrder with Items.StockUpdated in true
                this.service.Update(oldOrder);

                // Obtain new verified Order
                var newOrder = this.MapToVerifiedOrder(orderData);
                // Update newOrder with Items.StockUpdated in false
                this.service.Update(newOrder);
                // Discount Quantities of newOrder items to Stock
                this.UpdateStock(newOrder, "DISCOUNT_STOCK");
                // Update newOrder with Items.StockUpdated in true
                this.service.Update(newOrder);

                return Ok(new { Success = true, Message = "Order Updated!", 
                                requestedOrder = orderData,
                                resultOrder = newOrder });
            }
            catch
            {
                return Ok(new { Success = false, 
                                Message = "Error updating Order!!!", 
                                requestedOrder = orderData });
            }
        }

        /// <summary>
        /// Permite borrar una Orden
        /// </summary>
        /// <param name="id">Identificador de la Orden a borrar</param>
        /// <returns>Exito y el Id de la Orden eliminada o un codigo en caso de error</returns>
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            

            try
            {      
                var order = this.service.Get(id);
                // Set to false OrderItem.StockUpdated
                this.InitUpdateStock(order);
                // Update oldOrder with Items.StockUpdated in false
                this.service.Update(order);
                // Add Quantities of oldOrder items to Stock
                this.UpdateStock(order, "ADD_STOCK");
                // Update oldOrder with Items.StockUpdated in true
                this.service.Delete(order);
                return Ok(new { Success = true, Message = "Order Deleted!", data = id });
            }
            catch
            {
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }

    }
}