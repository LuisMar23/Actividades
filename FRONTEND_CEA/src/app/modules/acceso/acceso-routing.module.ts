import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginusuarioGuard } from 'src/app/guards/loginusuario.guard';
import { LoginruteGuard } from 'src/app/guards/loginrute.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent},
      { path: '**', redirectTo: 'login', pathMatch: 'full'},
    ],
    canActivate:[LoginruteGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccesoRoutingModule { }
