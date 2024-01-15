using System.ComponentModel.DataAnnotations;

namespace API_SERVER_CEA.Modelo
{
    public class ActividadTitulo
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Este campo no debe estar vacio")]
        public string titulo { get; set; }

        public int estado { get; set; }
    }
}
