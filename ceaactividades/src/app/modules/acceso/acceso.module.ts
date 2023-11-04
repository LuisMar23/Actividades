import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AccesoRoutingModule } from './acceso-routing.module';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AccesoRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
   
    
  ],
  exports:[LoginComponent]
})
export class AccesoModule { }
