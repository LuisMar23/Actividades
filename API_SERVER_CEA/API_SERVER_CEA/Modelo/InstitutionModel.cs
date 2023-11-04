using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace API_SERVER_CEA.Modelo
{
    public class Institucion
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Este campo no debe estar vacio")]
        public string? Nombre { get; set; }

        public string? Tipo { get; set; }

        public byte Estado { get; set; }

    }
}
