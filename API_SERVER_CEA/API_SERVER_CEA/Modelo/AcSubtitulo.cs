using System.ComponentModel.DataAnnotations;

namespace API_SERVER_CEA.Modelo
{
    public class AcSubtitulo
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Este campo no debe estar vacio")]
        public string subtitulo { get; set; }
        [Required(ErrorMessage = "Este campo no debe estar vacio")]
        public string descripcion { get; set; }
        public int ActituloId { get; set; }
        public ActividadTitulo? ActividadTitulo { get; set; }

        public int estado { get; set; }
    }
}
