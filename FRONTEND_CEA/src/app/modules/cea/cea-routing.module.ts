import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitucionComponent } from './institucion/institucion.component';
import { VisitaComponent } from './visita/visita.component';
import { LoginusuarioGuard } from 'src/app/guards/loginusuario.guard';
import { ActividadComponent } from './actividad/actividad.component';



const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'institucion', component:InstitucionComponent},
      { path: 'visita', component:VisitaComponent},
      { path: 'actividad', component:ActividadComponent},
      { path: '**', redirectTo: 'visita', pathMatch: 'full' },
    ],     canActivate:[LoginusuarioGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class  CeaRoutingModule { }
