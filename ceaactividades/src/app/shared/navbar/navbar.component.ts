import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isNavbarFixed = false;
  constructor(private usuario:LoginService, private router: Router){}
  ngOnInit() {
    this.GetUsuario();
  
  }

  user:any={};

  GetUsuario(){
    this.usuario.getUsuario().subscribe(response => {

        this.user=response;
    });
  }
  cerrarSesion() {
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
 

}
