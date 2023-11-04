import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitucionComponent } from './institucion/institucion.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CeaRoutingModule } from './cea-routing.module';
import { AgregarEditarInstitucionComponent } from './agregar-editar-institucion/agregar-editar-institucion.component';
import { VisitaComponent } from './visita/visita.component';
import { AgregarEditarVisitaComponent } from './agregar-editar-visita/agregar-editar-visita.component';
import { ReportesVisitaComponent } from './visita/reportes-visita/reportes-visita.component';
import { DialogDetailVisitComponent } from './visita/dialog-detail-visit/dialog-detail-visit.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatRadioModule} from '@angular/material/radio';
import { ActividadComponent } from './actividad/actividad.component';
import { AgregarEditarActividadComponent } from './agregar-editar-actividad/agregar-editar-actividad.component';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { DialogDetailActivityComponent } from './actividad/dialog-detail-activity/dialog-detail-activity.component';





@NgModule({
  declarations: [
    InstitucionComponent,
    AgregarEditarInstitucionComponent,
    VisitaComponent,
    AgregarEditarVisitaComponent,
    ReportesVisitaComponent,
    DialogDetailVisitComponent,
    AgregarEditarActividadComponent,
    ActividadComponent,
    DialogDetailActivityComponent,
 

  ],
  imports: [
    CommonModule,
    CeaRoutingModule,
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule
  ],
  exports:[
    InstitucionComponent,
    VisitaComponent
  ]
})
export class CeaModule { }
