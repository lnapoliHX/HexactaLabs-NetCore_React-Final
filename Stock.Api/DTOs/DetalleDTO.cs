using System.ComponentModel.DataAnnotations;

namespace Stock.Api.DTOs
{
    public class DetalleDTO
    {
        public string Id { get; set; }

        [Required]
        public string Fecha { get; set; }

        [Required]
        public decimal Cantidad { get; set; }

        public string ProductId { get; set; }
        public string CompraId { get; set; }

    }
}
