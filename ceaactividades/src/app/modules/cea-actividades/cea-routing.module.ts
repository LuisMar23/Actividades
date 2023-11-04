import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadesComponent } from './actividades/actividades.component';
import { ActividadComponent } from './actividad/actividad.component';
import { LoginusuarioGuard } from 'src/app/guards/loginusuario.guard';




const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'actividades', component:ActividadesComponent},
      { path: 'actividad', component:ActividadComponent},
      { path: '**', redirectTo: 'actividades', pathMatch: 'full' },
    ],    
    //  canActivate:[LoginusuarioGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class  CeaRoutingModule { }