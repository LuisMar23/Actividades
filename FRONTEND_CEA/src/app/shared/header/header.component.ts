import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  user: any = {};
  constructor(private usuario: LoginService, private router: Router) { }
  ngOnInit(): void {
    this.GetUsuario();
  }
  CerrarSesion() {
    Swal.fire({
      title: '¿Desea cerrar sesion?',
      showDenyButton: true,
      confirmButtonText: 'Ok',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuario.destruirSesion();
        this.router.navigate(['login']);
      }
    })
  }
  GetUsuario() {
    this.usuario.getUsuario().subscribe(a => {
      this.user = a;
      if (this.user.usuario == null) {

        Swal.fire({
          title: 'La sesión ha expirado, vuelva a iniciar sesión',
          confirmButtonText: 'Ok'
        }).then((result)=>{
          if(result.isConfirmed){
            localStorage.removeItem("usuario");
            this.router.navigate(['login']);
          }
        })
      }
    });
  }

}
