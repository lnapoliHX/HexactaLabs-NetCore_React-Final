using Stock.Model.Base;
using System.Collections.Generic;
using Stock.Model.Exceptions;
using System.ComponentModel.DataAnnotations.Schema;

namespace Stock.Model.Entities
{
    [Table("order")]
    public class Order: IEntity
    {
        Order () 
        {
            this.newItemList();
        }

        public string Id { get; set; }

        public string CustomerId { get; set; }

        public string DateTime { get; set; }

        private List<OrderItem> _items {get; set;}

        public virtual List<OrderItem> Items
        { 
            get
            {
                return this._items;
            }
        }

        public void newItemList()
        {
            this._items = new List<OrderItem>();
        }

        public void addItem(OrderItem item)
        {
            this._items.Add(item);
        }

        public decimal totalAmount() 
        {
            decimal amount = 0;

            this.Items.ForEach(item => amount += item.SalePrice * item.Quantity);

            return amount;
        }

    }
}
