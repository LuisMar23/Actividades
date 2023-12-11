import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CeaActividadesModule } from './modules/cea-actividades/cea-actividades.module';
import { AccesoModule } from './modules/acceso/acceso.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './core/services/interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AccesoModule,
    CeaActividadesModule,
    ReactiveFormsModule,
    
   
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
