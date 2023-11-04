import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IVisita } from '../interfaces/visita';


@Injectable({
  providedIn: 'root'
})
export class VisitaService {

  constructor(private httpclient:HttpClient) { }
  obtenerVisitas():Observable<any>{
    return this.httpclient.get<any>(`${environment.API_URL}/api/Visits`);
  }
  enviarVisitas(visita:IVisita):Observable<IVisita>{
    return this.httpclient.post<IVisita>(`${environment.API_URL}/api/Visits`,visita);
  }
  modificarVisitas(id:number,visita:IVisita):Observable<any>{
    return this.httpclient.put(`${environment.API_URL}/api/Visits/${id}`,visita)
  }
  obtenerVisita(id:number):Observable<any>{
    return this.httpclient.get<any>(`${environment.API_URL}/api/Visits/${id}`);
  }
  bajaVisita(id:number,visita:IVisita):Observable<any>{
    return this.httpclient.put(`${environment.API_URL}/api/Visits/baja/${id}`,visita)
  }

  generarReporte(r:any){
    return this.httpclient.post(`${environment.API_URL}/api/Visits/reporte`,r ,{observe: 'response',responseType: 'blob' });
  }


  // Dashboard
  obtenerTotal(){
    return this.httpclient.get(`${environment.API_URL}/api/Visits/total`);
  }
  
  obtenerTotalReuniones(){
    return this.httpclient.get(`${environment.API_URL}/api/Visits/totalReunion`);
  }
  obtenerTotalTalleresInternos(){
    return this.httpclient.get(`${environment.API_URL}/api/Visits/totalTalleresInternos`);
  }
  obtenerTotalTalleresExteriores(){
    return this.httpclient.get(`${environment.API_URL}/api/Visits/totalTalleresExternos`);
  }
  obtenerTotalCampañas(){
    return this.httpclient.get(`${environment.API_URL}/api/Visits/totalCampañas`);
  }

}
