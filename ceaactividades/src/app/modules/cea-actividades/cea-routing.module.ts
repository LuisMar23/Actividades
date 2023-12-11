import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadesComponent } from './actividades/actividades.component';
import { ActividadComponent } from './actividad/actividad.component';
import { LoginusuarioGuard } from 'src/app/guards/loginusuario.guard';
import { MisionvisionComponent } from './misionvision/misionvision.component';




const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'actividades', component:ActividadesComponent},
      { path: 'actividad/:id', component:ActividadComponent},
      {path:'misionvision',component:MisionvisionComponent},
      { path: '**', redirectTo: 'actividades', pathMatch: 'full' },
  
    ],    
     canActivate:[LoginusuarioGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class  CeaRoutingModule { }