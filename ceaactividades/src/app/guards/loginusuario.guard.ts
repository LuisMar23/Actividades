import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../core/services/login.service';


@Injectable({
  providedIn: 'root'
})
export class LoginusuarioGuard implements CanActivate {
  constructor(private leerusuario:LoginService, private router: Router){ }
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.leerusuario.existUser()) {
      return true;
    }
    else
    {
      this.router.navigate(['acceso/login'])
      return false;
    }
  }

}
