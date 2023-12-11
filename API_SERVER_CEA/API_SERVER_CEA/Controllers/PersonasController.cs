using API_SERVER_CEA.Context;
using API_SERVER_CEA.Modelo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_SERVER_CEA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class PersonasController : ControllerBase
    {
        private readonly ApplicationContext contexto;

        public PersonasController(ApplicationContext context)
        {
            this.contexto = context;
        }
        [HttpPost]
        public async Task<ActionResult<List<Persona>>> AgregarPersona(Persona persona)
        {
         
            if (persona == null)
            {
                return BadRequest();
            }
            else
            {
                contexto.Persona.Add(persona);
                await contexto.SaveChangesAsync();
                return Ok("Persona agregada con exito");

            }
        }

        
        [HttpGet]
        public async Task<ActionResult<List<Persona>>> ObtenerPersonas()
        {
            return await contexto.Persona.ToListAsync();
        }

        //Modificar: api/Persona
        [HttpPut("{id:int}")]
        public async Task<ActionResult<List<Persona>>> EditarInstituciones(int id, Persona persona)
        {
            Persona pers = await contexto.Persona.FirstOrDefaultAsync(x => x.Id == id);
            if (pers == null)
            {
                return BadRequest("No se encontro la Persona");
            }
            else
            {
                pers.nombrePersona = persona.nombrePersona;
                pers.apellidoPersona = persona.apellidoPersona;
                pers.edadPersona = persona.edadPersona;
                pers.ciPersona = persona.ciPersona;
                pers.genero = persona.genero;
                pers.celularPersona = persona.celularPersona;
                pers.barrio_zona = persona.barrio_zona;
                pers.email = persona.email;
                pers.estadoPersona = persona.estadoPersona;
                await contexto.SaveChangesAsync();
                return Ok();
            }
        }

        //ELIMINAR 
        [HttpPut("baja/{id:int}")]
        public async Task<ActionResult> EliminarLogico(int id, Persona persona)
        {
            Persona pers = await contexto.Persona.FirstOrDefaultAsync(x => x.Id == id);
            if (pers != null)
            {
                pers.estadoPersona = persona.estadoPersona;
                await contexto.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return BadRequest("No existe la persona a eliminar");
            }
        }
    }
}
