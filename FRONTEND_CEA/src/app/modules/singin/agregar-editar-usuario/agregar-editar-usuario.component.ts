import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelect } from '@angular/material/select';
import { Dialog } from '@angular/cdk/dialog';
import { IUsuario } from 'src/app/core/interfaces/usuario';
import { PersonaService } from 'src/app/core/services/persona.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { AlertaService } from 'src/app/core/services/alerta.service';
import Swal from 'sweetalert2';
import { IPersona } from 'src/app/core/interfaces/persona';


@Component({
  selector: 'app-agregar-editar-usuario',
  templateUrl: './agregar-editar-usuario.component.html',
  styleUrls: ['./agregar-editar-usuario.component.css']
})
export class AgregarEditarUsuarioComponent implements OnInit {
  hide = true;
  datosUsuarios: any = {};
  form: FormGroup;
  operacion: string = 'Agregar'
  id: number | undefined;
  sel: any;

  constructor(public dialogRef: MatDialogRef<AgregarEditarUsuarioComponent>,
    private fb: FormBuilder,
    private UsuarioService: UsuarioService,
    private PersonaService: PersonaService,
    private _alertaService: AlertaService,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.form = this.propUsuario();
    this.id = data.id;
  }
  ngOnInit(): void {
    this.esEditar(this.id)
  }

  esEditar(id: number | undefined) {
    if (id !== undefined) {
      this.operacion = 'Editar ';
      this.getUsuario(id);
    }
  }

  getUsuario(id: number) {
    this.UsuarioService.obtenerUsuario(id).subscribe((data) => {
      this.form.patchValue({
        nombrePersona: data[0].persona["nombrePersona"],
        apellidoPersona: data[0].persona["apellidoPersona"],
        edad: data[0].persona["edadPersona"],
        ci: data[0].persona["ciPersona"],
        celular: data[0].persona["celularPersona"],
        genero: data[0].persona["genero"],
        barrio_zona: data[0].persona["barrio_zona"],
        email: data[0].persona["email"],
        nombreUsuario: data[0].nombreUsuario,
        contrasenia: data[0].contraseniaUsuario,
        rolUsuario: data[0].rolUsuario,
      })
    })
  }
  listaRoles: string[] = ['Administrador', 'Usuario'];
  cancelar() {
    this.dialogRef.close();
  };

  agregarUsuario() {
    const usuario: IUsuario = {
      nombreUsuario: this.form.value.nombreUsuario,
      rolUsuario: this.form.value.rolUsuario,
      contraseniaUsuario: this.form.value.contrasenia,
      persona: {
        nombrePersona: this.form.value.nombrePersona,
        apellidoPersona: this.form.value.apellidoPersona,
        edadPersona: this.form.value.edad,
        ciPersona: this.form.value.ci,
        celularPersona: this.form.value.celular,
        email: this.form.value.email,
        genero:this.form.value.genero,
        barrio_zona:this.form.value.barrio_zona,
        estadoPersona: 1
      },
      estadoUsuario: 1
    }
    if (this.form.invalid) {
      return;
    }

    if (this.id == undefined) {
      this.UsuarioService.enviarUsuario(usuario).subscribe(() => {
        this._alertaService.mensajeAgregar("Usuario agregado");
      });
      this.dialogRef.close();

    }else {
      console.log(usuario)
      this.UsuarioService.modificarUsuario(this.id, usuario).subscribe(r => {
        this._alertaService.mensajeAgregar("Usuario modificado");
      });
      this.dialogRef.close(true);
    }
  }

  propUsuario() {
    return this.fb.group({
      nombrePersona: ['', Validators.required],
      apellidoPersona: ['', Validators.required],
      edad: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      ci: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      email: ['',[ Validators.email]],
      barrio_zona:[''],
      celular: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      nombreUsuario: ['', Validators.required],
      contrasenia: ['', Validators.required],
      genero: ['',[Validators.maxLength(1),Validators.required]],
      rolUsuario: ['', Validators.required]
    });
  }

}
