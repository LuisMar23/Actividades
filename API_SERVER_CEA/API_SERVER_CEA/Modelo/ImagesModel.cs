using System.ComponentModel.DataAnnotations;

namespace API_SERVER_CEA.Modelo
{
    public class ImagesModel
    {
        [Key]
        public int Id { get; set; }

        public string ruta { get; set; }

        public int estado { get; set; }

        public int? idActivity { get; set; }
        public ActivityModel? Activity { get; set; }
    }
}
