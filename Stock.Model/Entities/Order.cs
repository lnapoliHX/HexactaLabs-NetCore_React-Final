using Stock.Model.Base;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Stock.Model.Entities
{
    [Table("order")]
    public class Order: IEntity
    {
        public string Id { get; set; }

        public List<Product> Products { get; set; }

    }
}