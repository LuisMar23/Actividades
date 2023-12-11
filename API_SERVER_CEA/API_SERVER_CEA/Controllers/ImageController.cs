using API_SERVER_CEA.Context;
using API_SERVER_CEA.Modelo;
using ClosedXML;
using DocumentFormat.OpenXml.InkML;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace API_SERVER_CEA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ImageController : Controller
    {
        private readonly ApplicationContext contexto;
        //private readonly IMapper mapper;
        public ImageController(ApplicationContext context)
        {
            this.contexto = context;
        }
        [HttpPost("{actividadId}")]
        public async Task<ActionResult<List<ImagesModel>>> AgregarImagenes(int actividadId, ImagesModel imagenes)
        {
            var actividad = contexto.Activity.Find(actividadId);
            if (actividad == null)
            {
                return BadRequest("No se encontro la actividad");
            }
            imagenes.idActivity = actividadId;
            contexto.Images.Add(imagenes);
            await contexto.SaveChangesAsync();
            return Ok();

        }

        [HttpGet("actividad/{id}")]
        public async Task<ActionResult<List<ImagesModel>>> ObtenerImagenes(int actividadId)
        {

            var img = contexto.Images.Where(x => x.idActivity == actividadId).ToList();
            return Ok(img);

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<ImagesModel>>> ObtenerImagenesEspecifica(int id)
        {

            var img = contexto.Images.Find(id);
            if (img == null)
            {
                return NotFound();
            }
            return Ok(img);

        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<ImagesModel>>> editarImagenes(int id, ImagesModel imagenes)
        {
            if (id != imagenes.Id)
            {
                return BadRequest();
            }
            contexto.Entry(imagenes).State = EntityState.Modified;
            contexto.SaveChanges();
            return NoContent();
        }
        [HttpPut("baja/{id:int}")]
        public async Task<ActionResult<List<ImagesModel>>> bajaImagenes(int id, ImagesModel imagenes)
        {
            if (id != imagenes.Id)
            {
                return BadRequest();
            }
            contexto.Entry(imagenes).State = EntityState.Modified;
            contexto.SaveChanges();
            return NoContent();
        }


    }
}
