import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActividadesComponent } from './actividades/actividades.component';
import { ActividadComponent } from './actividad/actividad.component';
import { CeaRoutingModule } from './cea-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MisionvisionComponent } from './misionvision/misionvision.component';



@NgModule({
  declarations: [
   
    ActividadesComponent,
    ActividadComponent,
    MisionvisionComponent
  ],
  imports: [
    CommonModule,
    CeaRoutingModule,
    SharedModule
  ],
  exports:[ActividadesComponent,ActividadComponent]
})
export class CeaActividadesModule { }
