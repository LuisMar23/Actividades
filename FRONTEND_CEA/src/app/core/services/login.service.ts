import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http:HttpClient;
  constructor(private handler: HttpBackend
    ){
      this.http=new HttpClient(handler)
  }
  enviarUsuario(usuario:Login): Observable<Login>{
    return this.http.post<Login>(`${environment.API_URL}/api/Login`,usuario);
  }
  leerUsuario(){

    let usuario=JSON.parse(localStorage.getItem("usuario")||"")
    return usuario;
  }
  almacenarUsuario(usuario:any){
    localStorage.setItem("usuario",JSON.stringify(usuario));
  }
  destruirSesion(){
    localStorage.removeItem("usuario");
  }
  getUsuario(){
    return this.http.get(`${environment.API_URL}/api/Login`,
    {headers:this.getHeaders()});
  }
  getHeaders():HttpHeaders{
    return new HttpHeaders({
      'content-type': 'application/json',
      Authorization: `Bearer ${this.leerUsuario()}`,
    });
  }
  existUser(){
    var write = window.localStorage.getItem('usuario');
    return write;
  }
 

}
