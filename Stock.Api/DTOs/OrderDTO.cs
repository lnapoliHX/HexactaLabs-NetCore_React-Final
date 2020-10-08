using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Stock.Api.DTOs
{
    public class OrderDTO
    {
        public string Id { get; set; }

        public string CustomerId { get; set; }

        public string DateTime { get; set; }

        public List<OrderItemDTO> Items {get; set;}

    }
}