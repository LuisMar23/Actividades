import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { RolComponent } from './rol/rol.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginusuarioGuard } from 'src/app/guards/loginusuario.guard';


const routes: Routes = [
  {
    path: '',
    children: [
      //{ path: 'rol', component: RolComponent},
      { path:'usuario',component:UsuarioComponent, },
      { path: '**',redirectTo :'rol',pathMatch:'full'}
    ],
    canActivate:[LoginusuarioGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class  SingInRoutingModule { }
