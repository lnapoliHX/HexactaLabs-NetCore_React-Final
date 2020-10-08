using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Stock.Api.DTOs
{
    public class OrderItemDTO
    {
        //[Required]
        public string ProductId { get; set; }

        public string ProductName { get; set; }

        public decimal SalePrice { get; set; }

        public int Quantity {get; set; }

        public bool StockUpdated {get; set; }
    }
}