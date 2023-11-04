using System.ComponentModel.DataAnnotations;

namespace API_SERVER_CEA.Modelo
{
    public class User
    {
        [Key]
        public int idUsuario { get; set; }

        [Required(ErrorMessage = "Este campo no debe estar vacio")]
        public string?  nombreUsuario { get; set; }

        [Required(ErrorMessage = "Este campo no debe estar vacio")]
        public string? contraseniaUsuario { get; set; }

        [Required(ErrorMessage = "Este campo no debe estar vacio")]
        public int estadoUsuario { get; set; }

        [Required(ErrorMessage = "Este campo no debe estar vacio")]
        public string rolUsuario { get; set; }

        public int PersonaId { get; set; }
        public Persona? Persona { get; set; }
    }
}
