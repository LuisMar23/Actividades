import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.addHeaders(request);
    return next.handle(request)
  }
  constructor(private _loginservice:LoginService) { }
  addHeaders(request:HttpRequest<any>){
    let token: string | null = '';
      token = this._loginservice.leerUsuario();
      if (token) {
        return request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        return request;
      }
  }
}
