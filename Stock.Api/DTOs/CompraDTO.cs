using System.ComponentModel.DataAnnotations;

namespace Stock.Api.DTOs
{
    public class CompraDTO
    {
        public string Id { get; set; }

        [Required]
        public string Fecha { get; set; }

        [Required]
        public decimal? TotalPrice { get; set; }

        [Required]
        public DetalleDTO[] detalles { get; set; }
    }
}
