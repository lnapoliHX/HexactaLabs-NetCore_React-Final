namespace Stock.Api.DTOs
{
    public class DetalleSearchDTO
    {
        //public string Name { get; set; }
        public string CompraId { get; set; }
        public ActionDto Condition { get; set; } = ActionDto.AND;
    }
}