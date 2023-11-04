import { Component,OnInit } from '@angular/core';
import { LoginService } from 'src/app/core/services/login.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  user:any={};
  constructor(private usuario:LoginService){}
  ngOnInit(): void {
    this.GetUsuario();
  }
  GetUsuario(){
    this.usuario.getUsuario().subscribe(a => {

        this.user=a;
    });
  }
  
}
