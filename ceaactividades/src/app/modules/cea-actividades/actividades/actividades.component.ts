import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActividadesService } from 'src/app/core/services/actividades.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent {
  constructor(private actividades:ActividadesService,private route:Router){}
  activitys!:any;
  filteredActivitys !:any;
  totalPosiciones!:number;
  ngOnInit(){
    this.obtenerActividades();
    console.log(this.filteredActivitys)
  }

  obtenerActividades(){
    this.actividades.obtenerActivos().subscribe( data=>{

      this.activitys=data;
      this.filteredActivitys = data
      this.totalPosiciones = this.activitys.length;

    })
    
    
  }
  buscador(e:Event){

    const filterValue = (e.target as HTMLInputElement).value.trim().toLowerCase();
  
    this.filteredActivitys=this.activitys.filter((x: any) => {
      return x.nombre.toLowerCase().includes(filterValue);
    });
  }

}
