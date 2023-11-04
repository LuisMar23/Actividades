import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
//import { RolComponent } from './rol/rol.component';
import { SingInRoutingModule } from './singin-routing.module';
import { AgregarEditarUsuarioComponent } from './agregar-editar-usuario/agregar-editar-usuario.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsuarioComponent } from './usuario/usuario.component';

import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';



@NgModule({
  declarations: [
   //RolComponent,
    UsuarioComponent,
    AgregarEditarUsuarioComponent
  ],
  imports: [
    CommonModule,
    SingInRoutingModule,
    SharedModule,

    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    NgFor,
    FormsModule

  ],
  exports: [
   //RolComponent,
    UsuarioComponent
  ]
})
export class SingInModule { }
