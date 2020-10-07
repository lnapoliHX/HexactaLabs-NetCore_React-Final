using System.Collections.Generic;
namespace Stock.Api.DTOs
{
    public class OrderDTO
    {
        public string Id { get; set; }

        public Dictionary<string,int> Quantity{ get; set; }

    }
}
