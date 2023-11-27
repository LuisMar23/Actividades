import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IActividad } from 'src/app/core/interfaces/actividad';
import { ActividadService } from 'src/app/core/services/actividad.service';
import { DialogDetailVisitComponent } from '../visita/dialog-detail-visit/dialog-detail-visit.component';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/core/services/login.service';
import { DialogDetailActivityComponent } from './dialog-detail-activity/dialog-detail-activity.component';

import { AgregarEditarActividadComponent } from '../agregar-editar-actividad/agregar-editar-actividad.component';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent {

  id:number| undefined;
  displayedColumns:string[]=['Id','Nombre','Objetivo','Descripcion','Lugar','Fecha', 'Estado', 'Opciones'];
  private actividades!:IActividad[];
  private datos!:IActividad[];
  private activi!:IActividad[];
  dataSource =new MatTableDataSource<IActividad>(this.actividades);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  user:any={};



  constructor(
    private _actividadeservice:ActividadService,public dialog: MatDialog, public dialogReporte:MatDialog,public dialog1: MatDialog,
    private _usuario:LoginService) {
    }


  ngOnInit(): void {
    this.obteneractividades();
  }
  ngAfterViewInit():void{
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  //LISTAR actividades
    obteneractividades(){
      this._actividadeservice.obtenerActividades().subscribe((resp:IActividad[])=>{
        console.log(resp);
        this.datos=resp;
        this.dataSource.data=resp;
      })
    };

  //BUSCADOR
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  // openDialogDetail(actividad?:IActividad) {
  //   const dialogRef = this.dialog1.open(DialogDetailActivityComponent,{
     
  //     disableClose: false,
  //     data:{actividad:actividad},
      

  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
  openDialogDetail(id?:number) {
    const dialogRef = this.dialog1.open(DialogDetailActivityComponent,{
     
      disableClose: false,
      data:{id:id}

      

    });
    console.log(id)
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  AgregarEditarActividad(id?:number){
    const dialogRef = this.dialog.open(AgregarEditarActividadComponent, {
      disableClose: true,
      data:{id:id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.obteneractividades();
      }
    });
  }
  

  darBajaActividad(us:IActividad, accion: number){
    this.id=us.id;
    if (this.id!=undefined) {
      us.estado=accion;
      this._actividadeservice.bajaActividad(this.id,us).subscribe((r) => {
        this.obteneractividades();
    });
    }
  }



  // dataVisita(e:any){
  //   this.dataSource.data=this.datos.filter(x=>x.tipo==e.target.value);
  //   e.target.value="";
  // }



  eliminadoLogico(user: IActividad, accion: number) {
    var result = accion == 1 ? "activar" : "desactivar";
    Swal.fire({
      title: `¿Desea ${result} este actividad?`,
      showDenyButton: true,
      confirmButtonText: 'Ok',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.darBajaActividad(user, accion);
      }
    })
  }

  dataLimpiar(e:any){
    this.dataSource.data=this.datos;
    console.log(this.dataSource.data)
  }

  obtenerUsuario(){
    this._usuario.getUsuario().subscribe(a=>{
      this.user=a;
    });
  }

}
