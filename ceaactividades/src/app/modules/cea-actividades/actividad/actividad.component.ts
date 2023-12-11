import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IActividades } from 'src/app/core/interface/actividades';
import { ActividadesService } from 'src/app/core/services/actividades.service';
declare var $: any; 
@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent {
   datos!:IActividades;
  total!:any;
  imagenSeleccionada: string | null = null;
  constructor(private route: ActivatedRoute,private _actividadService:ActividadesService){}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      const parsedId = parseInt(id, 10);
      if (!isNaN(parsedId)) {
        this.traerDatos(parsedId);
        this.totalPersonasGenero(parsedId)
      } else {
        console.error('El valor de id no es un número válido');
      }
    } else {
 
      console.error('El valor de id es null');
    }
  }
  traerDatos(id:any){
    this._actividadService.obtenerActividad(id).subscribe((resp) => {
      this.datos=resp;
      if (this.datos.imagenes.length > 0) {
        this.imagenSeleccionada = this.datos.imagenes[0].ruta;
      }

    }); 
  }
  
  mostrarImagen(ruta: string) {
    this.imagenSeleccionada = ruta;

  }
  totalPersonasGenero(id:number){
    this._actividadService.obtenerTotalPersonasGenero(id).subscribe((r)=>{
      console.log(r);
      this.total=r;
    })
  }

  cargarImagen(imagenSeleccionada:any){
    $('#imagenModal').modal('show'); 
  }
}
