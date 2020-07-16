using System.ComponentModel.DataAnnotations;

namespace Stock.Api.DTOs
{
    public class BasketDTO
    {
        public string Id { get; set; }

        public int Quantity { get; set; }

        [Required]
        public string ProductId { get; set; }
        public string ProductDesc { get; set; }
        public decimal ProductPrice { get; set; }
        
    }
}