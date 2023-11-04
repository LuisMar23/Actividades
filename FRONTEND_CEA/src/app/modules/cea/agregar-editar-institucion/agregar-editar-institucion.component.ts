import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelect } from '@angular/material/select';
import { Dialog } from '@angular/cdk/dialog';
import { InstitucionService } from 'src/app/core/services/institucion.service';
import { Institucion } from 'src/app/core/interfaces/institucion';
import Swal from 'sweetalert2';
import { AlertaService } from 'src/app/core/services/alerta.service';

@Component({
  selector: 'app-agregar-editar-institucion',
  templateUrl: './agregar-editar-institucion.component.html',
  styleUrls: ['./agregar-editar-institucion.component.css']
})
export class AgregarEditarInstitucionComponent implements OnInit {
  operacion:string='Agregar ';
  institutions: string[] = ['Unidad Educativa', 'Institucion','Colectivo','Grupo Voluntario'];
  hide = true;
  id:number|undefined;
  
  form: FormGroup;
  constructor(public dialogRef: MatDialogRef<AgregarEditarInstitucionComponent>,
    private fb: FormBuilder, private _institucion: InstitucionService,
    private _alertaservice:AlertaService,
    @Inject(MAT_DIALOG_DATA) public data:any) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required]
    });
    this.id=data.id;
  }
  ngOnInit(): void {
    this.esEditar(this.id);
  }
  esEditar(id?:number){
    if (id!==undefined) {
      this.operacion="Editar ";
      this.obtenerInstitucion(id);
    }
  }
  obtenerInstitucion(id:number){
    this._institucion.obtenerInstitucion(id).subscribe(data=>{
        this.form.patchValue({
          nombre:data.nombre,
          tipo:data.tipo
        })
    })
  }
  addEditarInstitucion() {
    if (this.form.invalid) {
      return;
    }
    const institucion: Institucion = {
      nombre: this.form.value.nombre,
      tipo: this.form.value.tipo,
      estado: 1
    };
    if (this.id==undefined) {
      this._institucion.agregarInstitucion(institucion).subscribe((resp) => {
        this._alertaservice.mensajeAgregar("Institucion agregada");
      }, (e) => {
        console.log(e.error)
      });
    }else{
      this._institucion.editarInstitucion(this.id,institucion).subscribe(r=>{
        this._alertaservice.mensajeAgregar("Institucion modificada");
      });
    }
    this.dialogRef.close(true);
  };

  cancelar() {
    this.dialogRef.close(false);
  };
}
