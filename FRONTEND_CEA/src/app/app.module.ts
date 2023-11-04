import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AccesoModule } from './modules/acceso/acceso.module';

import { HomeModule } from './modules/home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SingInModule } from './modules/singin/singin.module';
import { CeaModule } from './modules/cea/cea.module';
import { InterceptorService } from './core/services/interceptor.service';
// import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// import { getStorage, provideStorage } from '@angular/fire/storage';
// import { environmentF } from 'src/environments/environmentFirebase';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    // provideFirebaseApp(() => initializeApp(environmentF.firebase)),
    // provideStorage(() => getStorage()),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AccesoModule,
    HomeModule,
    BrowserAnimationsModule,
    SingInModule,
    CeaModule
  ],
  providers: [
  
    {provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
