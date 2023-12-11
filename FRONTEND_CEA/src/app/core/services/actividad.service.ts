import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IActividad } from '../interfaces/actividad';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  private ruta:string="/api/Activity";
  usuario!:any;

  constructor(private httpclient:HttpClient) {}
  obtenerActividades():Observable <any>{
    return this.httpclient.get<any>(`${environment.API_URL}/api/Activity/obtenerActividades`);

  }
  agregarActividad(actividad:IActividad):Observable<any>{
    return this.httpclient.post<IActividad>(`${environment.API_URL}/api/Activity`,actividad);
  }
  editarActividad(id:number,actividad:IActividad):Observable<any>{
    return this.httpclient.put<any>(`${environment.API_URL}${this.ruta}/${id}`,actividad);
  }
  obtenerActividad(id:number):Observable<any>{
    return this.httpclient.get<any>(`${environment.API_URL}${this.ruta}/${id}`,
    );
  }
  obtenerActivos():Observable<any>{
    return this.httpclient.get<any>(`${environment.API_URL}/api/Activity/obtenerActivos`);
  }
  obtenerTotal(){
    return this.httpclient.get(`${environment.API_URL}/api/Activity/total`);
  }

  bajaActividad(id:number,actividad:IActividad):Observable<any>{
    return this.httpclient.put(`${environment.API_URL}/api/Activity/baja/${id}`,actividad)
  }
  obtenerTotalPersonasGenero():Observable<any>{
    return this.httpclient.get(`${environment.API_URL}${this.ruta}/totalPersonasGenero/${8}`);
  }
}
