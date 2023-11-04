using System.ComponentModel.DataAnnotations;

namespace API_SERVER_CEA.Modelo
{
    public class Visita
    {
        [Key]
        public int id { get; set; }

        public string? observaciones { get; set; }

        [Required(ErrorMessage = "Este campo no debe estar vacio")]
        public string tipo { get; set; }

        public int estado { get; set; }

        public int InstitucionId { get; set; }
        public Institucion? Institucion { get; set; }

        public int ActividadId { get; set; }
        public ActivityModel? Actividad { get; set; }

        public int PersonaId { get; set; }
        public Persona? Persona { get; set; }

    }
}
