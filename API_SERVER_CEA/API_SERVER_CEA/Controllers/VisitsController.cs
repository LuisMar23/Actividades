using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_SERVER_CEA.Context;
using API_SERVER_CEA.Modelo;
using Microsoft.AspNetCore.Authorization;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.InkML;
using System.Reflection;
using System.Data;
using DocumentFormat.OpenXml.Office2010.Excel;

namespace API_SERVER_CEA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class VisitsController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public VisitsController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/Visitas
        [HttpGet]
        public async Task<ActionResult<List<Visita>>> ObtenerVisitas()
        {
            var datos = from v in this._context.Visita
                        join i in this._context.Institucion on v.InstitucionId equals i.Id
                        join p in this._context.Persona on v.PersonaId equals p.Id
                        join a in this._context.Activity on v.ActividadId equals a.Id
                        select new Visita
                        {
                            id = v.id,
                            observaciones = v.observaciones,
                            tipo = v.tipo,
                            estado = v.estado,
                            Persona = v.Persona,
                            Institucion = v.Institucion,
                            Actividad = v.Actividad,
                        };
            return await datos.ToListAsync();
        }
        // GET: api/Visitas id
        [HttpGet("{id:int}")]
        public async Task<ActionResult<List<Visita>>> ObtenerVisita(int id)
        {
            var datos = from v in this._context.Visita
                        join p in this._context.Persona on v.PersonaId equals p.Id
                        join i in this._context.Institucion on v.InstitucionId equals i.Id
                        join a in this._context.Activity on v.ActividadId equals a.Id
                        where v.id == id
                        select new Visita
                        {
                            id = v.id,
                            observaciones = v.observaciones,
                            tipo = v.tipo,
                            estado = v.estado,
                            Persona = v.Persona,
                            Institucion = v.Institucion,
                            Actividad = v.Actividad,
                        };
            return await datos.ToListAsync();
        }


        // POST: api/Visitas
        [HttpPost]
        public async Task<ActionResult<List<Visita>>> AgregarVisita(Visita visita)
        {
            Visita inst = await _context.Visita.FirstOrDefaultAsync(x => x.id == visita.id);
            if (inst != null)
            {
                return BadRequest("Esta Visita ya existe");
            }
            else
            {
                _context.Visita.Add(visita);
                await _context.SaveChangesAsync();
                return Ok();

            }
        }

        //PUT: api/Visitas
        [HttpPut("{id:int}")]
        public async Task<ActionResult<List<Visita>>> EditarVisita(int id, Visita visita)
        {
            Visita v = await _context.Visita.FirstOrDefaultAsync(x => x.id == id);
            Persona p = await _context.Persona.FirstOrDefaultAsync(x => x.Id == v.PersonaId);
            if (v == null)
            {
                return BadRequest("No se encontro la visita");
            }
            else
            {
                v.observaciones = visita.observaciones;
                v.tipo = visita.tipo;
                v.estado = visita.estado;
                v.InstitucionId = visita.InstitucionId;
                v.ActividadId = visita.ActividadId;
                p.nombrePersona = visita.Persona.nombrePersona;
                p.apellidoPersona = visita.Persona.apellidoPersona;
                p.edadPersona = visita.Persona.edadPersona;
                p.ciPersona = visita.Persona.ciPersona;
                p.genero=visita.Persona.genero;
                p.celularPersona = visita.Persona.celularPersona;
                p.barrio_zona = visita.Persona.barrio_zona;
                p.email = visita.Persona.email;
                p.estadoPersona = visita.Persona.estadoPersona;
                await _context.SaveChangesAsync();
                return Ok();
            }
        }

        //ELIMINAR 
        [HttpPut("baja/{id:int}")]
        public async Task<ActionResult> EliminarLogico(int id, Visita visita)
        {
            Visita v = await _context.Visita.FirstOrDefaultAsync(x => x.id == id);
            if (v != null)
            {
                v.estado = visita.estado;
                await _context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return BadRequest("No existe la visita a eliminar");
            }
        }


        //[HttpPost("reporte")]
        //[Authorize(Roles = "Administrador")]
        //public IActionResult Exportar_Excel(Reporte reporte)
        //{
        //    var query = from v in _context.Visita
        //                join p in this._context.Persona on v.PersonaId equals p.Id
        //                join i in this._context.Institucion on v.InstitucionId equals i.Id
        //                join a in this._context.Activity on v.id equals a.Id
        //                where a.fecha >= reporte.FechaInicio &&
        //                    a.fecha <= reporte.FechaFinal && v.estado == 1 && v.tipo == reporte.Tipo
        //                select new DataVisit
        //                {
        //                    actividad = a.nombre,
        //                    observaciones = v.observaciones,
        //                    lugar = a.lugar,
        //                    tipo = v.tipo,
        //                    fecha = a.fecha,
        //                    nombrePersona = p.nombrePersona,
        //                    apellidoPersona = p.apellidoPersona,
        //                    edad = p.edadPersona,
        //                    ciPersona = p.ciPersona,
        //                    celularPersona = p.celularPersona,
        //                    genero = p.genero == 1 ? "Masculino":"Femenino",
        //                    barriozona = p.barrio_zona,
        //                    nombreInstitucion=i.Nombre,
        //                };
        //    //Crea un tabla a partir del modelo visita
        //    DataTable? tabla = new DataTable(typeof(DataVisit).Name);

        //    //Toma las propiedades de Visita y las asigna a la variable props
        //    PropertyInfo[] props = typeof(DataVisit).GetProperties(BindingFlags.Public | BindingFlags.Instance);

        //    //Añade las propiedades alas columnas en base a su tipo(string,int,etc)
        //    foreach (var prop in props)
        //    {
        //        tabla.Columns.Add(prop.Name, prop.PropertyType);
        //    }

        //    var values = new object[props.Length];
        //    //Recorre la consulta y asigna sus valores alas columnas 
        //    foreach (var item in query)
        //    {

        //        for (var i = 0; i < props.Length; i++)
        //        {
        //            values[i] = props[i].GetValue(item, null);
        //        }
        //        tabla.Rows.Add(values);

        //    }
        //    using (var inst = new XLWorkbook())
        //    {
        //        tabla.TableName = "VISITA " + reporte.Tipo.ToUpper();
        //        var hoja = inst.Worksheets.Add(tabla);
        //        hoja.ColumnsUsed();

        //        using (var memoria = new MemoryStream())
        //        {
        //            inst.SaveAs(memoria);
        //            var nombreExcel = string.Concat("Reporte Visita", DateTime.Now.ToString(), ".xlsx");
        //            return File(memoria.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", nombreExcel);
        //        }
        //    }
        //}

        [HttpPost("reporte")]
        [Authorize(Roles = "Administrador")]
        public IActionResult Exportar_Excel(Reporte reporte)
        {
            var query = from v in _context.Visita
                        join p in this._context.Persona on v.PersonaId equals p.Id
                        join i in this._context.Institucion on v.InstitucionId equals i.Id
                        join a in this._context.Activity on v.id equals a.Id
                        where a.fecha >= reporte.FechaInicio &&
                            reporte.FechaFinal<=a.fecha && v.estado == 1 && v.tipo == reporte.Tipo
                        select new DataVisit
                        {
                            actividad = a.nombre,
                            observaciones = v.observaciones,
                            lugar = a.lugar,
                            tipo = v.tipo,
                            fecha = a.fecha,
                            nombrePersona = p.nombrePersona,
                            apellidoPersona = p.apellidoPersona,
                            edad = p.edadPersona,
                            ciPersona = p.ciPersona,
                            celularPersona = p.celularPersona,
                            genero = p.genero == 1 ? "Masculino" : "Femenino",
                            barriozona = p.barrio_zona,
                            nombreInstitucion = i.Nombre,
                        };

            DataTable tabla = new DataTable(typeof(DataVisit).Name);

            PropertyInfo[] props = typeof(DataVisit).GetProperties(BindingFlags.Public | BindingFlags.Instance);

            foreach (var prop in props)
            {
                if (prop.Name != "Id")
                {
                    tabla.Columns.Add(prop.Name, prop.PropertyType);
                }
            }

            var values = new object[props.Length];
            foreach (var item in query)
            {
                for (var i = 0; i < props.Length; i++)
                {
                    values[i] = props[i].GetValue(item, null);
                }
                tabla.Rows.Add(values);
            }

            int totalRegistros = query.Count();
            tabla.Columns.Add("Total Registros", typeof(int));
            tabla.Rows.Add();
            tabla.Rows[tabla.Rows.Count - 1]["Total Registros"] = totalRegistros;

            using (var inst = new XLWorkbook())
            {
                tabla.TableName = "VISITA " + reporte.Tipo.ToUpper();
                var hoja = inst.Worksheets.Add(tabla);

                // Cambiar el estilo de las columnas
                var columnas = hoja.Columns();
                columnas.Style.Fill.BackgroundColor = XLColor.Yellow; // Cambia el color de fondo de las columnas
                columnas.Style.Font.Bold = true; // Hace que el texto de las columnas sea negrita

                hoja.ColumnsUsed();

                using (var memoria = new MemoryStream())
                {
                    inst.SaveAs(memoria);
                    var nombreExcel = string.Concat("Reporte Visita", DateTime.Now.ToString(), ".xlsx");
                    return File(memoria.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", nombreExcel);
                }
            }
        }


        [HttpGet("total")]
        public async Task<ActionResult<List<Visita>>> totalVisitas()
        {
            var n=await _context.Visita.CountAsync(v=>v.estado==1);
            return Ok(n);
        }

        [HttpGet("totalReunion")]
        public async Task<ActionResult<List<Visita>>> totalReuniones()
        {
            var n = await _context.Visita.CountAsync(v => v.estado == 1 && v.tipo=="Reunion");
            return Ok(n);
        }


        [HttpGet("totalTalleresInternos")]
        public async Task<ActionResult<List<Visita>>> totalTalleresInternos()
        {
            var n = await _context.Visita.CountAsync(v => v.estado == 1 && v.tipo == "Talleres Ambientales Internos");
            return Ok(n);
        }
        [HttpGet("totalTalleresExternos")]
        public async Task<ActionResult<List<Visita>>> totalTalleresExternos()
        {
            var n = await _context.Visita.CountAsync(v => v.estado == 1 && v.tipo == "Talleres Ambientales Externos");
            return Ok(n);
        }

        [HttpGet("totalCampañas")]
        public async Task<ActionResult<List<Visita>>> totalCampañas()
        {
            var n = await _context.Visita.CountAsync(v => v.estado == 1 && v.tipo == "Campañas Ambientales");
            return Ok(n);
        }

    }
}