
using API_SERVER_CEA.Context;
using API_SERVER_CEA.Modelo;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.InkML;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Data;
using System.Reflection;

namespace API_SERVER_CEA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class InstitucionController : ControllerBase
    {
        private readonly ApplicationContext contexto;

        public InstitucionController(ApplicationContext context)
        {
            this.contexto = context;
        }
        [HttpPost]
        public async Task<ActionResult<List<Institucion>>> AgregarInstitucion(Institucion institution)
        {
            Institucion inst = await contexto.Institucion.FirstOrDefaultAsync(x => x.Nombre == institution.Nombre);
            if (inst != null)
            {
                return BadRequest("Este institucion ya existe");
            }
            else
            {
                contexto.Institucion.Add(institution);
                await contexto.SaveChangesAsync();
                return Ok();

            }
        }

        [HttpGet]
        public async Task<ActionResult<List<Institucion>>> ObtenerInstituciones() {

            return await contexto.Institucion.ToListAsync();
        }

        //GET: activos
        [HttpGet("obtenerActivos")]
        public async Task<ActionResult<List<Institucion>>> ObtenerInstitucionesActivos()
        {
            var datos = from ins in this.contexto.Institucion where ins.Estado == 1 select ins;

            return await datos.ToListAsync();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<List<Institucion>>> EditarInstituciones(int id, Institucion institution)
        {
            Institucion ins = await contexto.Institucion.FirstOrDefaultAsync(x => x.Id == id);
            if (ins == null)
            {
                return BadRequest("No se encontro la Institucion");
            }
            else
            {
                ins.Nombre = institution.Nombre;
                ins.Tipo = institution.Tipo;
                ins.Estado = institution.Estado;
                await contexto.SaveChangesAsync();
                return Ok();
            }
        }

        [HttpGet("{id:int}")]

        public async Task<ActionResult<List<Institucion>>> ObtenerInstitucion(int id)
        {

            var institucion = await contexto.Institucion.FirstOrDefaultAsync(x => x.Id == id);
            return Ok(institucion);
        }



        [HttpGet("total")]
        public async Task<ActionResult<List<Institucion>>> totalInstituciones()
        {
            var n = await contexto.Institucion.CountAsync(i=>i.Estado==1);
            return Ok(n);

        }
    }
}
