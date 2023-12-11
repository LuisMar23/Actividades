using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_SERVER_CEA.Context;
using API_SERVER_CEA.Modelo;
using System.Security.Cryptography;
using System.IO;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using DocumentFormat.OpenXml.Office2010.Excel;
using DocumentFormat.OpenXml.InkML;

namespace API_SERVER_CEA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Administrador")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationContext contexto;
        public dynamic du;
        public UsersController(ApplicationContext context)
        {
            this.contexto = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<List<User>>> ObtenerUsuarios()
        {
            var datos = from us in this.contexto.Usuario
                        join p in this.contexto.Persona on us.PersonaId equals p.Id
                        select new User
                        {
                            idUsuario = us.idUsuario,
                            nombreUsuario = us.nombreUsuario,
                            rolUsuario = us.rolUsuario,
                            contraseniaUsuario = us.contraseniaUsuario,
                            estadoUsuario = us.estadoUsuario,
                            Persona = us.Persona
                        };

            return await datos.ToListAsync();
        }


        [HttpGet("{id:int}")]
        public async Task<ActionResult<List<User>>> ObtenerUsuario(int id)
        {
            
            var datos = from us in this.contexto.Usuario
                        join p in this.contexto.Persona on us.PersonaId equals p.Id
                        where us.idUsuario == id
                        select new User
                        {
                            idUsuario = us.idUsuario,
                            nombreUsuario = us.nombreUsuario,
                            rolUsuario=us.rolUsuario,
                            contraseniaUsuario= UsersController.Descrypt(us.contraseniaUsuario),
                            estadoUsuario = us.estadoUsuario,
                            Persona = us.Persona
                        };
            
            return await datos.ToListAsync();
        }


        [HttpPut("{id:int}")]
        public async Task<ActionResult> EditarUsuario(int id, User usuario)
        {

            User user = await contexto.Usuario.FirstOrDefaultAsync(x => x.idUsuario == id);
            Persona existen = await contexto.Persona.FirstOrDefaultAsync(x => x.Id == user.PersonaId);
            //Role r=await contexto.Rol.FirstOrDefaultAsync(x=> x.Id== user.RolId);
            if (user == null)
            {
                return BadRequest("No se encontró el usuario");
            }
            else
            {
                user.nombreUsuario = usuario.nombreUsuario;
                user.estadoUsuario = usuario.estadoUsuario;
                var i = Encrypt(usuario.contraseniaUsuario);
                user.contraseniaUsuario = i;
                user.rolUsuario = usuario.rolUsuario;
                //existen.Id = usuario.Persona.Id;
                existen.nombrePersona = usuario.Persona.nombrePersona;
                existen.apellidoPersona = usuario.Persona.apellidoPersona;
                existen.edadPersona = usuario.Persona.edadPersona;
                existen.ciPersona = usuario.Persona.ciPersona;
                existen.celularPersona = usuario.Persona.celularPersona;
                existen.barrio_zona = usuario.Persona.barrio_zona;
                existen.genero= usuario.Persona.genero;
                existen.email = usuario.Persona.email;
                existen.estadoPersona = usuario.Persona.estadoPersona;
         
                await contexto.SaveChangesAsync();
                return Ok();
            }
        }

        [HttpPost]
        public async Task<ActionResult<List<User>>> AgregarUsuario(User user)
        {
            var usuario = await contexto.Usuario.FirstOrDefaultAsync(x => x.nombreUsuario == user.nombreUsuario);
            if (usuario == null)
            {
                var i = Encrypt(user.contraseniaUsuario);
                user.contraseniaUsuario = i;
                contexto.Usuario.Add(user);
                await contexto.SaveChangesAsync();
                return Ok();

            }
            else
            {
                return BadRequest("Este usuario ya existe");

            }
        }


        //ELIMINAR 
        [HttpPut("baja/{id:int}")]
        public async Task<ActionResult<List<User>>> EliminarLogico(int id, User user)
        {
            User usuario = await contexto.Usuario.FirstOrDefaultAsync(x => x.idUsuario == id);
            if (usuario != null)
            {
                usuario.estadoUsuario = user.estadoUsuario;
                await contexto.SaveChangesAsync();
                return Ok();
            }
            else 
            {
                return BadRequest();
            }
        }
      

        public static string Encriptar(string cadena)
        {
            SHA256 llave = SHA256.Create();
            ASCIIEncoding e = new ASCIIEncoding();
            byte[] s = null;
            StringBuilder stringBuilder = new StringBuilder();
            s = llave.ComputeHash(e.GetBytes(cadena));
            for (int i = 0; i < s.Length; i++) stringBuilder.AppendFormat("{0:x2}", s[i]);
            return stringBuilder.ToString();
        }


        public static string Encrypt(string passw)
        {
            string hash = "OH6wxsAWhwo=";
            byte[] data = UTF8Encoding.UTF8.GetBytes(passw);


            MD5 md5 = MD5.Create();
            TripleDES tripleDES = TripleDES.Create();

            tripleDES.Key = md5.ComputeHash(UTF8Encoding.UTF8.GetBytes(hash));
            tripleDES.Mode = CipherMode.ECB;

            ICryptoTransform transform = tripleDES.CreateEncryptor();
            byte[] result = transform.TransformFinalBlock(data, 0, data.Length);

            return Convert.ToBase64String(result);
        }
        

        public static string Descrypt(string passwDecode)
        {
            string hash = "OH6wxsAWhwo=";
            byte[] data = Convert.FromBase64String(passwDecode);

            MD5 md5 = MD5.Create();
            TripleDES tripleDES = TripleDES.Create();

            tripleDES.Key = md5.ComputeHash(UTF8Encoding.UTF8.GetBytes(hash));
            tripleDES.Mode = CipherMode.ECB;

            ICryptoTransform transform = tripleDES.CreateDecryptor();
            byte[] result = transform.TransformFinalBlock(data, 0, data.Length);

            return UTF8Encoding.UTF8.GetString(result);
        }
        [HttpGet("total")]
        public async Task<ActionResult<List<User>>> totalUsuarios()
        {
            var n = await contexto.Usuario.CountAsync(u=>u.estadoUsuario==1) ;
            return Ok(n);
        }

    }

}

