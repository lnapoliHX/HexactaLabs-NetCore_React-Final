<<<<<<< HEAD
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
=======
﻿using System.ComponentModel.DataAnnotations;
>>>>>>> 793c351ba6774106181125d4f919cfc16954ae58

namespace Stock.Api.DTOs
{
    public class ProductDTO
    {
        //[Required]
        public string Id { get; set; }

        public string Name { get; set; }

        public string ProductTypeId { get; set; }

        public string ProductTypeDesc { get; set; }

        public string ProviderId{ get; set; }

        public decimal CostPrice { get; set; }

        public decimal SalePrice { get; set; }

        public int Stock {get; set; }

        //private int _stock {get; set; }

        //public List<ProviderDTO> Providers {get; set; }



    }
}
