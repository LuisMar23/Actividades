import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

constructor(private httpclient: HttpClient) { }

  obtenerPersona():Observable<any>{
    return this.httpclient.get<any>(`${environment.API_URL}/api/Personas`);
  }

}
