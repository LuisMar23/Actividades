import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Institucion } from '../interfaces/institucion';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class InstitucionService {
  private ruta:string="/api/Institucion";
  usuario!:any;

  constructor(private httpclient:HttpClient,private _loginservice:LoginService,) {}
  obtenerInstituciones():Observable <any>{
    return this.httpclient.get<any>(`${environment.API_URL}/api/Institucion`);

  }
  agregarInstitucion(institucion:Institucion):Observable<Institucion>{
    return this.httpclient.post<Institucion>(`${environment.API_URL}/api/Institucion`,institucion);
  }
  editarInstitucion(id:number,institucion:Institucion):Observable<any>{
    return this.httpclient.put<any>(`${environment.API_URL}${this.ruta}/${id}`,institucion);
  }
  obtenerInstitucion(id:number):Observable<any>{
    return this.httpclient.get<any>(`${environment.API_URL}${this.ruta}/${id}`,
    );
  }
  obtenerActivos():Observable<any>{
    return this.httpclient.get<any>(`${environment.API_URL}/api/Institucion/obtenerActivos`);
  }
  obtenerTotal(){
    return this.httpclient.get(`${environment.API_URL}/api/Institucion/total`);
  }
}
