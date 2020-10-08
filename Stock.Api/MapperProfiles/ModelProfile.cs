using AutoMapper;
using Stock.Api.DTOs;
using Stock.Model.Entities;

namespace Stock.Api.MapperProfiles
{
    public class ModelProfile : Profile
    {
        public ModelProfile()
        {
            CreateMap<ProductType, ProductTypeDTO>()
                //.IgnoreAllNonExisting()
                .ReverseMap()
                .ForMember(s => s.Id, opt => opt.Ignore());

            CreateMap<Product, ProductDTO>()
                .ForMember(d => d.ProductTypeId, opt => opt.MapFrom(s => s.ProductType.Id))
                .ForMember(d => d.ProductTypeDesc, opt => opt.MapFrom(s => s.ProductType.Description))
                .ForMember(d => d.Stock, opt => opt.MapFrom(s => s.Stock))
                //.ForMember(d => d.Providers, opt => opt.MapFrom(s => s.Providers))
                .ReverseMap()
                .ForMember(s => s.Id, opt => opt.Ignore());

            CreateMap<Product, OrderItem>()
                .ForMember(d => d.ProductId, opt => opt.MapFrom(s => s.Id))
                .ForMember(d => d.ProductName, opt => opt.MapFrom(s => s.Name))
                .ForMember(d => d.SalePrice, opt => opt.MapFrom(s => s.SalePrice))
                .ReverseMap()
                .ForMember(s => s.Id, opt => opt.Ignore());

            CreateMap<Provider, ProviderDTO>()
                 .ReverseMap();         

            CreateMap<OrderItem, OrderItemDTO>()
                //.ForMember(d => d.ProductId, opt => opt.MapFrom(s => s.Product.Id))
                //.ForMember(d => d.ProductName, opt => opt.MapFrom(s => s.Product.Name))
                //.ForMember(d => d.SalePrice, opt => opt.MapFrom(s => s.Product.SalePrice))
                .ReverseMap();
                //.ForMember(s => s.Product.Id, opt => opt.Ignore());
        }        
    }


}
