import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import { IVisita } from 'src/app/core/interfaces/visita';
import { VisitaService } from 'src/app/core/services/visita.service';
import { DateAdapter } from '@angular/material/core';
import { ActividadService } from 'src/app/core/services/actividad.service';
import { IActividad } from 'src/app/core/interfaces/actividad';

@Component({
  selector: 'app-dialog-detail-activity',
  templateUrl: './dialog-detail-activity.component.html',
  styleUrls: ['./dialog-detail-activity.component.css']
})
export class DialogDetailActivityComponent implements OnInit {
  id!:number;
  constructor(public dialogRef:MatDialogRef<DialogDetailActivityComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _actividad:ActividadService

    ) {
      this.id=data.id;
      this.obtenerActividad(this.id);
     }

  ngOnInit() {
  }


  actividad:any=[]
  obtenerActividad(id:number){
    this._actividad.obtenerActividad(id).subscribe(data=>{
      this.actividad=data
  
    
    })
   
  }
}
