using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Stock.Api.DTOs
{
    public class CheckoutDTO
    {
        public string Id { get; set; }

        public int PurchaseQuantity { get; set; }

        public bool IsSold { get; set; }

        public string Name { get; set; }

        public decimal salePrice { get; set; }
    }
}
