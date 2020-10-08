using Stock.Model.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace Stock.Model.Entities
{
    [Table("detalle")]
    public class Detalle : IEntity
    {
        public string Id { get; set; }
        public string Fecha { get; set; }
        public decimal Cantidad { get; set; }
        public string ProductId { get; set; }
        public string CompraId { get; set; }
        // public virtual Product Product { get; set; }

        //public virtual Compra compra { get; set; }    //fk de compra ?
    }
}
