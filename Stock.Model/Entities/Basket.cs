using Stock.Model.Base;
using Stock.Model.Exceptions;
using System.ComponentModel.DataAnnotations.Schema;

namespace Stock.Model.Entities
{
    [Table("basket")]

    public class Basket: IEntity
    {
        public string Id { get; set; }

        public int Quantity { get; set; }

        public virtual Product Product { get; set; }

    }
}