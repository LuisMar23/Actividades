import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUsuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpclient:HttpClient) { }
  obtenerUsuarios():Observable<any>{
    return this.httpclient.get<any>(`${environment.API_URL}/api/Users`);
  }

  enviarUsuario(usuario:IUsuario):Observable<any>{
    return this.httpclient.post(`${environment.API_URL}/api/Users`,usuario);
  }

  modificarUsuario(id:number,usuario:IUsuario):Observable<any>{
    return this.httpclient.put(`${environment.API_URL}/api/Users/${id}`,usuario)
  }

  bajaUsuario(id:number,usuario:IUsuario):Observable<any>{
    return this.httpclient.put(`${environment.API_URL}/api/Users/baja/${id}`,usuario)
  }

  obtenerUsuario(id:number):Observable<any>{
    return this.httpclient.get<any>(`${environment.API_URL}/api/Users/${id}`);
  }
  
  obtenerTotal(){
    return this.httpclient.get(`${environment.API_URL}/api/Users/total`);
  }
}
