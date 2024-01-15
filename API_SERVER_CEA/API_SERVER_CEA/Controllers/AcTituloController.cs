using API_SERVER_CEA.Context;
using API_SERVER_CEA.Modelo;
using DocumentFormat.OpenXml.InkML;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_SERVER_CEA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AcTituloController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public AcTituloController(ApplicationContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<ActividadTitulo>>> ObtenerTitulos()
        {
            var datos = from a in this._context.actividadTitulo
                        select new ActividadTitulo
                        {
                            Id = a.Id,
                            titulo = a.titulo,
                            estado = a.estado
                        };
            return await datos.ToListAsync();
        }
        [HttpGet("obtenerTitulosActivos")]
        public async Task<ActionResult<List<ActividadTitulo>>> TitulosAtivos()
        {

            var datos = (from a in this.contexto.Activity
                         join i in this.contexto.Images on a.Id equals i.idActivity
                         where a.estado == 1
                         select new ActivityModel
                         {
                             Id = a.Id,
                             nombre = a.nombre,
                             objetivo = a.objetivo,
                             descripcion = a.descripcion,
                             lugar = a.lugar,
                             fecha = a.fecha,
                             estado = a.estado,
                             Imagenes = a.Imagenes
                         }).ToList();

            var datosFiltrados = datos.GroupBy(a => a.Id)
                                      .Select(g => g.First())
                                      .ToList();

            return Ok(datosFiltrados);
        }

    }
}
