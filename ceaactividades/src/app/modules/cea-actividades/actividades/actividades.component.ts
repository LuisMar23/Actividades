import { Component } from '@angular/core';
import { ActividadesService } from 'src/app/core/services/actividades.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent {
  constructor(private actividades:ActividadesService){}
  activitys!:any;
  filteredActivitys !:any;
  totalPosiciones!:number;
  ngOnInit(){
    this.obtenerActividades();
  }

  obtenerActividades(){
    this.actividades.obtenerActivos().subscribe( data=>{
      console.log(data)
      this.activitys=data;
      this.filteredActivitys = data
      this.totalPosiciones = this.activitys.length;
      console.log(this.totalPosiciones);

    })
    
    
  }
  buscador(e:Event){

    const filterValue = (e.target as HTMLInputElement).value.trim().toLowerCase();
    console.log(filterValue);
    this.filteredActivitys=this.activitys.filter((x: any) => {
      return x.nombre.toLowerCase().includes(filterValue);
    });
  }

}
