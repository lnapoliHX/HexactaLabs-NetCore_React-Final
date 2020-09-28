using Stock.Model.Base;
<<<<<<< HEAD
using System.Collections.Generic;
=======
>>>>>>> 6df99f5f4d613fd1494eaa06a4f06e9e68db8cb4
using Stock.Model.Exceptions;
using System.ComponentModel.DataAnnotations.Schema;

namespace Stock.Model.Entities
{
    [Table("product")]
    public class Product: IEntity
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public decimal CostPrice { get; set; }

        public decimal SalePrice { get; set; }

        public virtual ProductType ProductType { get; set; }

<<<<<<< HEAD
        private int _stock {get; set; }
=======
        private int _stock;
>>>>>>> 6df99f5f4d613fd1494eaa06a4f06e9e68db8cb4

        public int Stock
        {
            get
            {
                return this._stock;
            }
        }

<<<<<<< HEAD
        public void DiscountStock(int value)
=======
        public void DescontarStock(int value)
>>>>>>> 6df99f5f4d613fd1494eaa06a4f06e9e68db8cb4
        {
            if (this._stock - value < 0)
                throw new ModelException("No hay stock disponible para efectuar la operación.");

            this._stock -= value;
        }

<<<<<<< HEAD
        public void AddStock(int value)
=======
        public void SumarStock(int value)
>>>>>>> 6df99f5f4d613fd1494eaa06a4f06e9e68db8cb4
        {
            this._stock += value;
        }

<<<<<<< HEAD
        //public string ProviderId { get; set; }
        public List<Provider> Providers { get; set; }

=======
        public string ProviderId { get; set; }
        public Provider Provider { get; set; }
>>>>>>> 6df99f5f4d613fd1494eaa06a4f06e9e68db8cb4
    }
}
