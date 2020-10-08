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
    [Route("api/compra")]
    [ApiController]
    public class CompraController : ControllerBase
    {
        private readonly CompraService CompraService;
        private readonly DetalleService DetalleService;
        private readonly ProductService ProducService;
        private readonly ProductTypeService productTypeService;
        private readonly IMapper mapper;

        public CompraController(CompraService CompraService, DetalleService DetalleService, ProductService ProducService, ProductTypeService productTypeService, IMapper mapper)
        {
            this.CompraService = CompraService;
            this.DetalleService = DetalleService;
            this.ProducService = ProducService;
            this.productTypeService = productTypeService;
            this.mapper = mapper;
        }

        /// <summary>
        /// Permite recuperar todas las instancias
        /// </summary>
        /// <returns>Una colección de instancias</returns>
        [HttpGet]
        public ActionResult<IEnumerable<Compra>> Get()
        {
            try
            {
                var result = this.CompraService.GetAll();
                return this.mapper.Map<IEnumerable<Compra>>(result).OrderByDescending(x => x.Fecha).ToList();
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        /// <summary>
        /// Permite crear una nueva instancia
        /// </summary>
        /// <param name="compra">Una instancia</param>
        [HttpPost]
        public ActionResult Post([FromBody] CompraDTO compra)
        {
            TryValidateModel(compra);
            // TryValidateModel(compra);
            try
            {
                var nuevaCompra = this.mapper.Map<Compra>(compra);

                this.CompraService.Create(nuevaCompra);

                if ((nuevaCompra.Id) != null)
                {
                    for (int i = 0; i < compra.detalles.Length; i++)
                    {
                        var detalle = this.mapper.Map<Detalle>(compra.detalles[i]);
                        detalle.CompraId = nuevaCompra.Id;
                        this.ProducService.DescontarStock(detalle.Id, Convert.ToInt32(detalle.Cantidad));
                        this.DetalleService.Create(detalle);
                    }
                    return Ok(new { Success = true, Message = "Bien", data = compra.detalles.Length });
                }
                return Ok(new { Success = true, Message = "Error de creacion 1", data = compra.detalles.Length });
            }
            catch
            {
                return Ok(new { Success = false, Message = "Error de creacion", data = compra.detalles.Length });
            }
        }

        /// <summary>
        /// Permite editar una instancia
        /// </summary>
        /// <param name="id">Identificador de la instancia a editar</param>
        /// <param name="value">Una instancia con los nuevos datos</param>
        [HttpPut("{id}")]
        public void Put(string id, [FromBody] ProductDTO value)
        {
            var product = this.ProducService.Get(id);
            TryValidateModel(value);
            this.mapper.Map<ProductDTO, Product>(value, product);
            product.ProductType = this.productTypeService.Get(value.ProductTypeId.ToString());
            this.ProducService.Update(product);
        }

        [HttpPost("search")]
        public ActionResult Search([FromBody] ProductSearchDTO model)
        {
            Expression<Func<Product, bool>> filter = x => !string.IsNullOrWhiteSpace(x.Id);

            if (!string.IsNullOrWhiteSpace(model.Name))
            {
                filter = filter.AndOrCustom(
                    x => x.Name.ToUpper().Contains(model.Name.ToUpper()),
                    model.Condition.Equals(ActionDto.AND));
            }

            if (!string.IsNullOrWhiteSpace(model.Brand))
            {
                filter = filter.AndOrCustom(
                    x => x.ProductType.Description.ToUpper().Contains(model.Brand.ToUpper()),
                    model.Condition.Equals(ActionDto.AND));
            }

            var products = this.ProducService.Search(filter);
            return Ok(products);
        }

        /// <summary>
        /// Permite borrar una instancia
        /// </summary>
        /// <param name="id">Identificador de la instancia a borrar</param>
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            try
            {
                var product = this.ProducService.Get(id);
                this.ProducService.Delete(product);
                return Ok(new { Success = true, Message = "", data = id });
            }
            catch
            {
                return Ok(new { Success = false, Message = "", data = id });
            }
        }

        /// <summary>
        /// Permite conocer el stock de un producto
        /// </summary>
        /// <param name="id">Identificador del producto</param>
        /// <returns>El stock disponible</returns>
        [HttpGet("stock/{id}")]
        public ActionResult<GenericResultDTO<int>> ObtenerStock(string id)
        {
            return new GenericResultDTO<int>(this.ProducService.ObtenerStock(id));
        }

        /// <summary>
        /// Permite descontar una cantidad de stock a un producto
        /// </summary>
        /// <param name="id">Identificador del producto</param>
        /// <param name="value">La cantidad a descontar</param>
        [HttpPut("stock/descontar/{id}")]
        public void DescontarStock(string id, [FromBody] int value)
        {
            this.ProducService.DescontarStock(id, value);
        }

        /// <summary>
        /// Permite sumar una cantidad de stock a un producto
        /// </summary>
        /// <param name="id">Identificador del producto</param>
        /// <param name="value">La cantidad a sumar</param>
        [HttpPut("stock/sumar/{id}")]
        public void SumarStock(string id, [FromBody] int value)
        {
            this.ProducService.SumarStock(id, value);
        }

        /// <summary>
        /// Permite obtener el precio de venta al público de un producto
        /// </summary>
        /// <param name="id">Identificador del producto</param>
        /// <returns>El precio de venta al público</returns>
        [HttpGet("precioVenta/{id}")]
        public ActionResult<GenericResultDTO<decimal>> ObtenerPrecioVenta(string id)
        {
            return new GenericResultDTO<decimal>(this.ProducService.ObtenerPrecioVentaPublico(id));
        }

        /// <summary>
        /// Permite obtener el precio de venta de un producto para un empleado
        /// </summary>
        /// <param name="id">Identificador del producto</param>
        /// <returns>El precio de venta para un empleado</returns>
        [HttpGet("precioVentaEmpleado/{id}")]
        public ActionResult<GenericResultDTO<decimal>> ObtenerPrecioVentaEmpleado(string id)
        {
            return new GenericResultDTO<decimal>(this.ProducService.ObtenerPrecioVentaEmpleado(id));
        }
    }
}
