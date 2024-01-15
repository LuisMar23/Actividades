using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace API_SERVER_CEA.Modelo
{
    public class ActivityModel
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Este campo no debe estar vacio")]
        public string nombre { get; set; }

        [Required(ErrorMessage = "Este campo no debe estar vacio")]
        public string objetivo { get; set; }

        [Required(ErrorMessage = "Este campo no debe estar vacio")]
        public string descripcion { get; set; }

        [Required(ErrorMessage = "Este campo no debe estar vacio")]
        public string lugar { get; set; }

        [Required]
        public DateTime fecha { get; set; }

        [Required(ErrorMessage = "Este campo no debe estar vacio")]
        public int estado { get; set; }

        public List<ImagesModel>? Imagenes { get; set; }

        public int ActituloId { get; set; }
        public AcSubtitulo? AcSubtitulo { get; set; }

        public int AcsubtituloId { get; set; }
        public ActividadTitulo? ActividadTitulo { get; set; }


    }
}
