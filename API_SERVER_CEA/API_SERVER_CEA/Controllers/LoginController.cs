using API_SERVER_CEA.Context;
using API_SERVER_CEA.Modelo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.CodeDom.Compiler;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using DocumentFormat.OpenXml.Office2010.Excel;
using DocumentFormat.OpenXml.Spreadsheet;
using System.Security.Cryptography;
using Irony.Parsing;

namespace API_SERVER_CEA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ApplicationContext contexto;

        private readonly IConfiguration _config;
       
        public LoginController(ApplicationContext _contexto,IConfiguration config)
        {
            this.contexto = _contexto;
            _config = config;
        }

        [HttpPost]
        //public async Task<ActionResult<List<LoginUser>>> Login(LoginUser userlogin)
        //{
        //    string ePass = UsersController.Encriptar(userlogin.Password);
        //    var u = await contexto.Usuario.FirstOrDefaultAsync(user => user.nombreUsuario.ToLower() == userlogin.UserName.ToLower() && user.contraseniaUsuario == ePass);
        //    if (u != null)
        //    {


        //        var token = Generar(u);
        //        return Ok(token);
        //    }
        //    else
        //    {
        //        return NotFound("Usuario no encontrado");
        //    }



        //}
        public  IActionResult Login(LoginUser userLogin)
        {
            var user = Authenticate(userLogin);
            if (user != null)
            {
              
                if (user.estadoUsuario != 1)
                {
                    return BadRequest(new { estado = $"El usuario {userLogin.UserName}  se encuentra desactivado" });
                }
                else
                {
                    var token = Generar(user);
                    return Ok(token);
                }
                
            }
            return BadRequest(new { estado = "Las credenciales de sesion del usuario ingresado fueron incorrectas verifique e ingrese nuevamente" });
        }
        [HttpGet]
        public IActionResult Get()
        {
            var currentUser = GetCurrentUser();
            return Ok( new 
            { usuario=currentUser.nombreUsuario,
              rol=currentUser.rolUsuario,
            });
        }

        private User Authenticate(LoginUser userlogin)
        {

            string ePass = UsersController.Encrypt(userlogin.Password);
            var currentuser = contexto.Usuario.FirstOrDefault(user => user.nombreUsuario == userlogin.UserName && user.contraseniaUsuario == ePass );
            if (currentuser != null)
            {
              
                return currentuser;
            }
            return null;
        }
        private dynamic Generar(User user)
        {
            var security = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credencial = new SigningCredentials(security, SecurityAlgorithms.HmacSha256);
         
            //Crear los claims

            //https://www.youtube.com/watch?v=tm8_merp_v0&t=10s
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,user.nombreUsuario),
                new Claim(ClaimTypes.Role,user.rolUsuario),         
            };
            //Crear el token
            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credencial);
            return new
            {
                message="exito",
                tok = new JwtSecurityTokenHandler().WriteToken(token)
            };
        }
        private User GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                var userClaims = identity.Claims;
                return new User
                {
                    nombreUsuario = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value,
                    rolUsuario = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Role)?.Value
           
                };
            }
            return null;
        }
    }
}
