using System.ComponentModel.DataAnnotations;

namespace API_SERVER_CEA.Modelo
{
    public class LoginUser
    {
        [Required(ErrorMessage = "Este campo no debe estar vacio")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Este campo no debe estar vacio")]
        public string Password { get; set; }
    }
}
