using API_SERVER_CEA.Context;
using API_SERVER_CEA.Modelo;
using Microsoft.AspNetCore.Mvc;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.InkML;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Data;
using System.Reflection;
using System.ComponentModel;
using System.Diagnostics;

namespace API_SERVER_CEA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class ActivityController : Controller
    {
   
        private readonly ApplicationContext contexto;

        public ActivityController(ApplicationContext context)
        {
            this.contexto = context;
        }
        [HttpPost]
        public async Task<ActionResult<List<ActivityModel>>> AgregarActividad(ActivityModel activity)
        {
            ActivityModel img = await contexto.Activity.FirstOrDefaultAsync(x => x.nombre == activity.nombre);
            if (img != null)
            {
                return BadRequest("Esta Actividad ya existe");
            }
            else
            {
                contexto.Activity.Add(activity);
                await contexto.SaveChangesAsync();
                return Ok();

            }
        }

        [HttpGet]
        public async Task<ActionResult<List<ActivityModel>>> ObtenerActividades()
        {
            var datos = (from a in this.contexto.Activity
                         join i in this.contexto.Images on a.Id equals i.idActivity
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

        //GET: activos
        [HttpGet("obtenerActividades")]
        public async Task<ActionResult<List<ActivityModel>>> actividades()
        {


            return await contexto.Activity.ToListAsync();
        }

       
        [HttpPut("{id:int}")]
        public async Task<ActionResult<List<ActivityModel>>> EditarActividades(int id, ActivityModel activity)
        {
            ActivityModel act = await contexto.Activity.Include(a => a.Imagenes).FirstOrDefaultAsync(x => x.Id == id);

            if (act == null)
            {
                return BadRequest("No se encontró la actividad");
            }
            else
            {
                // Eliminar todas las imágenes asociadas a la actividad
                contexto.Images.RemoveRange(act.Imagenes);

                // Actualizar los demás datos de la actividad
                act.nombre = activity.nombre;
                act.objetivo = activity.objetivo;
                act.descripcion = activity.descripcion;
                act.lugar = activity.lugar;
                act.fecha = activity.fecha;
                act.estado = activity.estado;
                act.Imagenes = activity.Imagenes;

                await contexto.SaveChangesAsync();
                return Ok();
            }
            //ActivityModel act = await contexto.Activity.Include(a => a.Imagenes).FirstOrDefaultAsync(x => x.Id == id);
            //if (act == null)
            //{
            //    return BadRequest("No se encontró la actividad");
            //}
            //else
            //{
            //    if (act.Imagenes != null)
            //    {
            //        contexto.Images.RemoveRange(act.Imagenes);
            //    }

            //    act.nombre = activity.nombre;
            //    act.objetivo = activity.objetivo;
            //    act.descripcion = activity.descripcion;
            //    act.lugar = activity.lugar;
            //    act.fecha = activity.fecha;
            //    act.estado = activity.estado;
            //    act.Imagenes = activity.Imagenes;

            //    try
            //    {
            //        await contexto.SaveChangesAsync();
            //        return Ok();
            //    }
            //    catch (Exception ex)
            //    {
            //        // Manejar la excepción según tus necesidades
            //        return BadRequest("Error al guardar los cambios");
            //    }
            //}
        }
        //[HttpGet("{id:int}")]

        //public async Task<ActionResult<List<ActivityModel>>> ObtenerActividad(int id)
        //{
        //    var datos =  await (from a in this.contexto.Activity
        //                join i in this.contexto.Images on a.Id equals i.idActivity
        //                where a.Id == id 
        //                select new ActivityModel
        //                {
        //                    Id = a.Id,
        //                    nombre = a.nombre,
        //                    objetivo = a.objetivo,
        //                    descripcion = a.descripcion,
        //                    lugar = a.lugar,
        //                    fecha = a.fecha,
        //                    estado = a.estado,
        //                    Imagenes = a.Imagenes
        //                }).FirstOrDefaultAsync();
        //    return Ok(datos);

        //}
        [HttpGet("{id:int}")]
        public async Task<ActionResult<List<ActivityModel>>> ObtenerActividad(int id)
        {
            var datos = await (from a in this.contexto.Activity
                               where a.Id == id
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
                               }).FirstOrDefaultAsync();

            if (datos != null)
            {
                if (datos.Imagenes == null)
                {
                    datos.Imagenes = new List<ImagesModel>(); // Crear una lista vacía si no hay imágenes asociadas
                }
                else
                {
                    var imagenes = await (from i in this.contexto.Images
                                          where i.idActivity == id
                                          select i).ToListAsync();

                    datos.Imagenes = imagenes;
                }

                return Ok(datos);
            }

            return NotFound(); // Devolver NotFound si no se encuentra la actividad
        }



        [HttpGet("total")]
        public async Task<ActionResult<List<ActivityModel>>> totalActividades()
        {
            var n = await contexto.Activity.CountAsync(i => i.estado == 1);
            return Ok(n);

        }

        //ELIMINAR 
        [HttpPut("baja/{id:int}")]
        public async Task<ActionResult<List<ActivityModel>>> EliminarLogico(int id, ActivityModel activity)
        {
            ActivityModel actividad = await contexto.Activity.Include(a => a.Imagenes).FirstOrDefaultAsync(x => x.Id == id);
            if (actividad != null)
            {
                actividad.estado = activity.estado;
                foreach (var imagen in actividad.Imagenes)
                {
                    imagen.estado = activity.estado;
                }
                await contexto.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpGet("totalpersonas")]
        public async Task<ActionResult<int>> totalpersonasActividades(int actividadId)
        {
            try
            {
                var cantidadPersonas = await contexto.Visita
                    .Where(v => v.ActividadId == actividadId)
                    .Select(v => v.PersonaId)
                    .Distinct()
                    .CountAsync();

                return Ok(cantidadPersonas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocurrió un error en el servidor.");
            }
        }

        [HttpGet("totalPersonasGenero")]
        public async Task<ActionResult<int>> totalPersonasGenero(int actividadId)
        {
            try
            {
                var cantidadPersonas = await contexto.Visita
                 .Where(v => v.ActividadId == actividadId)
                 .Select(v => v.PersonaId)
                 .Distinct()
                 .CountAsync();
                var cantidadVarones = await contexto.Visita
                    .Where(v => v.ActividadId == actividadId && v.Persona.genero == 1)
                    .Select(v => v.PersonaId)
                    .Distinct()
                    .CountAsync();

                var cantidadMujeres = await contexto.Visita
                    .Where(v => v.ActividadId == actividadId && v.Persona.genero == 2)
                    .Select(v => v.PersonaId)
                    .Distinct()
                    .CountAsync();

                var resultado = new cantidadPersonasGenero
                {
                    CantidadTotal=cantidadPersonas,
                    CantidadVarones = cantidadVarones,
                    CantidadMujeres = cantidadMujeres
                };

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                // Manejar el error adecuadamente
                return StatusCode(500, "Ocurrió un error en el servidor.");
            }
        }

    }
}
