<<<<<<< HEAD
=======
using System.Collections.Generic;
>>>>>>> 6df99f5f4d613fd1494eaa06a4f06e9e68db8cb4
using System.ComponentModel.DataAnnotations;

namespace Stock.Api.DTOs
{
    public class ProviderDTO
    {
        [Required]
        public string Name { get; set; }

        public string Id { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

    }
}