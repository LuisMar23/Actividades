import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


import { Institucion } from 'src/app/core/interfaces/institucion';
import { InstitucionService } from 'src/app/core/services/institucion.service';
import { AgregarEditarInstitucionComponent } from '../agregar-editar-institucion/agregar-editar-institucion.component';
import { LoginService } from 'src/app/core/services/login.service';
import Swal from 'sweetalert2';
import { LiveAnnouncer } from '@angular/cdk/a11y';
@Component({
  selector: 'app-institucion',
  templateUrl: './institucion.component.html',
  styleUrls: ['./institucion.component.css']
})
export class InstitucionComponent implements OnInit, AfterViewInit {
  id: number | undefined;
  displayedColumns: string[] = ['Id', 'Nombre', 'Tipo', 'Estado', 'opciones'];
  private instituciones!: Institucion[];

  dataSource = new MatTableDataSource<Institucion>(this.instituciones);
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private _institucionservice: InstitucionService, public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer) { }
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.obtenerInstituciones();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  agregarEditarInstitucion(id?: number) {
    const dialogRef = this.dialog.open(AgregarEditarInstitucionComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.obtenerInstituciones();
    })
  }
  obtenerInstituciones() {
    this._institucionservice.obtenerInstituciones().subscribe((resp: Institucion[]) => {
      this.dataSource.data = resp;
    })

  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  darBajaInstitucion(insti: Institucion, accion: number) {
    this.id = insti.id;
    if (this.id != undefined) {
      insti.estado = accion;
      this._institucionservice.editarInstitucion(this.id, insti).subscribe((r) => {
        this.obtenerInstituciones();
      });
    }

  }
  eliminadoLogico(insti: Institucion, accion: number) {
    var result = accion == 1 ? "activar" : "desactivar";
    Swal.fire({
      title: `¿Desea ${result} esta institucion?`,
      showDenyButton: true,
      confirmButtonText: 'Ok',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.darBajaInstitucion(insti, accion);
      }
    })
  }


  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
