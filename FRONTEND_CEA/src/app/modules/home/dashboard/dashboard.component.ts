import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActividadService } from 'src/app/core/services/actividad.service';
import { InstitucionService } from 'src/app/core/services/institucion.service';
import { LoginService } from 'src/app/core/services/login.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { VisitaService } from 'src/app/core/services/visita.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,AfterViewInit{
  cantidadInstituciones!:any;
  cantidadVisitas!:any;
  cantidadUsuarios!:any;
  cantidadActividades!:any;


  cantidadReuniones!:any;
  cantidadExteriores!:any;
  cantidadInternos!:any;
  cantidadCampanias!:any;
  user:any={};
  constructor(private _visitaService:VisitaService,
    private _institucionService:InstitucionService,
    private _usuarioService:UsuarioService,
    private _actividadService:ActividadService,
    private _loginService:LoginService) { }

  ngOnInit() {
    this.totVisitas();
    this.totInstitucion();
    this.totUsuarios();

    this.totVisitaReuniones();
    this.totVisitaExteriores();
    this.totVisitaInternos();
    this.totVisitaCampanias();
    this.totalActividades();
  }
  ngAfterViewInit(): void {

  }
  totVisitas(){
    this._visitaService.obtenerTotal().subscribe((resp)=>{
     this.cantidadVisitas=resp;
    });
  }
  totInstitucion(){
    this._institucionService.obtenerTotal().subscribe(resp=>{
      this.cantidadInstituciones=resp;
    })
  }
  totUsuarios(){
    return this._loginService.getUsuario().subscribe(a=>{
      this.user=a;
      if(this.user.rol=="Administrador"){
        this._usuarioService.obtenerTotal().subscribe(resp=>{
          this.cantidadUsuarios=resp;
        })
      }
    })
  }
  totVisitaReuniones(){
    this._visitaService.obtenerTotalReuniones().subscribe((resp)=>{
     this.cantidadReuniones=resp;
    });
  }
  totVisitaExteriores(){
    this._visitaService.obtenerTotalTalleresExteriores().subscribe((resp)=>{
     this.cantidadExteriores=resp;
    });
  }

  totVisitaInternos(){
    this._visitaService.obtenerTotalTalleresInternos().subscribe((resp)=>{
     this.cantidadInternos=resp;
    });
  }
  totVisitaCampanias(){
    this._visitaService.obtenerTotalCampañas().subscribe((resp)=>{
     this.cantidadCampanias=resp;
    });
  }

  totalActividades(){
    this._actividadService.obtenerTotal().subscribe((resp)=>{
      this.cantidadActividades=resp;
    })
  }
}
