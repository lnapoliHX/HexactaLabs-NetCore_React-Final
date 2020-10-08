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
    [Route("api/detalle")]
    [ApiController]
    public class DetalleController : ControllerBase
    {
        private DetalleService service;
        private readonly IMapper mapper;

        public DetalleController(DetalleService service, IMapper mapper)
        {
            this.service = service;
            this.mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<DetalleDTO>> Get()
        {
            try
            {
                var result = this.service.GetAll();
                return this.mapper.Map<IEnumerable<DetalleDTO>>(result).ToList();
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        [HttpGet("{id}")]
        public ActionResult<DetalleDTO> Get(string id)
        {
            try
            {
                var result = this.service.Get(id);
                return this.mapper.Map<DetalleDTO>(result);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        // [HttpPost("search")]
        [HttpGet("search/{id}")]
        public ActionResult Search(string id)
        {

            var model = new DetalleSearchDTO();
            model.CompraId = id;
            model.Condition = 0;

            Expression<Func<Detalle, bool>> filter = x => !string.IsNullOrWhiteSpace(x.CompraId);

            if (!string.IsNullOrWhiteSpace(model.CompraId))
            {
                filter = filter.AndOrCustom(
                    x => x.CompraId.ToUpper().Contains(model.CompraId.ToUpper()),
                    model.Condition.Equals(ActionDto.AND));
            }

            var detalles = this.service.Search(filter);
            return Ok(detalles);
        }

    }
}