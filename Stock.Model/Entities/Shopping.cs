using System.Collections.Generic;
using Stock.Model.Base;

namespace Stock.Model.Entities
{
    public class Shopping : IEntity
    {
        public string Id { get; set; }

        public decimal TotalPrice { get; set; }

        public List<Product> Products { get; set; }
    }
}