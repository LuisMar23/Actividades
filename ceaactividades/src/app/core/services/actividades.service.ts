import { Injectable } from '@angular/core';
import { Actividades } from '../interface/actividades';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {
  private ruta:string="/api/Activity";
  constructor(private httpclient:HttpClient) { }

  obtenerActividad(id:number):Observable<any>{
    return this.httpclient.get<any>(`${environment.API_URL}${this.ruta}/${id}`,
    );
  }
  obtenerActivos():Observable<any>{
    return this.httpclient.get<any>(`${environment.API_URL}/api/Activity`);
  }
  obtenerTotal(){
    return this.httpclient.get(`${environment.API_URL}/api/Activity/total`);
  }
  obtenerTotalPersonas(){
    return this.httpclient.get(`${environment.API_URL}/api/Activity/totalpersonas`);
  }
  obtenerTotalPersonasGenero(){
    return this.httpclient.get(`${environment.API_URL}/api/Activity/totalPersonasGenero`);
  }
  
}
