using Stock.Model.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace Stock.Model.Entities
{
    [Table("compra")]
    public class Compra : IEntity
    {
        public string Id { get; set; }

        public string Fecha { get; set; }

        public decimal TotalPrice { get; set; }
        // public virtual Detalle Detalle { get; set; }
    }
}
