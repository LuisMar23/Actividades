import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { VisitaService } from 'src/app/core/services/visita.service';
import { IVisita } from '../../../core/interfaces/visita';
import { AgregarEditarVisitaComponent } from '../agregar-editar-visita/agregar-editar-visita.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportesVisitaComponent } from './reportes-visita/reportes-visita.component';
import { DialogDetailVisitComponent } from './dialog-detail-visit/dialog-detail-visit.component';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-visita',
  templateUrl: './visita.component.html',
  styleUrls: ['./visita.component.css']
})
export class VisitaComponent implements OnInit,AfterViewInit {
  id:number| undefined;
  displayedColumns:string[]=['Id','Nombre','Apellido','Edad','CI','Genero','Celular','Institucion','Tipo','Fecha', 'Estado', 'Opciones'];
  private visitas!:IVisita[];
  private datos!:IVisita[];
  private visi!:IVisita[];
  dataSource =new MatTableDataSource<IVisita>(this.visitas);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  user:any={};

  constructor(
    private _visitaservice:VisitaService,public dialog: MatDialog, public dialogReporte:MatDialog,public dialog1: MatDialog,
    private _usuario:LoginService) {
    }


  ngOnInit(): void {
    this.obtenerVisitas();
    this.obtenerUsuario();
  }
  ngAfterViewInit():void{
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  //LISTAR VISITAS
    obtenerVisitas(){
      this._visitaservice.obtenerVisitas().subscribe((resp:IVisita[])=>{
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
  
    // Aplicar filtro adicional por nombre
    const nombreFilterValue = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      return data.persona.nombrePersona.toLowerCase().includes(filter);
    };
    this.dataSource.filter = nombreFilterValue;
  }

  //MODAL REPORTES
  GenerarReportes(){
    const dialogRefReporte = this.dialogReporte.open(ReportesVisitaComponent, {
      width: '700px',
      disableClose: true,
    });
  }

  openDialogDetail(visita?:IVisita) {
    const dialogRef = this.dialog1.open(DialogDetailVisitComponent,{
      disableClose: false,
      data:{visita:visita},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  AgregarEditarVisita(id?:number){
    const dialogRef = this.dialog.open(AgregarEditarVisitaComponent, {
      width: '60%',
      disableClose: true,
      data:{id:id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.obtenerVisitas();
      }
    });
  }

  darBajaVisita(visita:IVisita, accion: number){
    this.id=visita.id;
    if (this.id!=undefined) {
      visita.estado=accion;
      this._visitaservice.bajaVisita(this.id,visita).subscribe((r) => {
      this.obtenerVisitas();
    });
    }
  }
  dataVisita(e:any){
    this.dataSource.data=this.datos.filter(x=>x.tipo==e.target.value);
    e.target.value="";
  }

  eliminadoLogico(visi: IVisita, accion: number) {
    var result = accion == 1 ? "activar" : "desactivar";
    Swal.fire({
      title: `¿Desea ${result} esta visita?`,
      showDenyButton: true,
      confirmButtonText: 'Ok',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.darBajaVisita(visi, accion);
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
