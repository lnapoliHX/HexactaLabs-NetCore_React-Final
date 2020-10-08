using Stock.Model.Base;
using System.Collections.Generic;
using Stock.Model.Exceptions;
using System.ComponentModel.DataAnnotations.Schema;

namespace Stock.Model.Entities
{
    public class OrderItem
    {
        public string ProductId { get; set; }

        public string ProductName { get; set; }

        public decimal SalePrice { get; set; }

        public int Quantity {get; set; }

        public bool StockUpdated {get; set; }
    }
}
