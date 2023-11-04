// import { IRol } from 'src/app/core/interfaces/rol';
// import { RolService } from 'src/app/core/services/rol.service';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';
// import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
// @Component({
//   selector: 'app-rol',
//   templateUrl: './rol.component.html',
//   styleUrls: ['./rol.component.css']
// })
// export class RolComponent  implements OnInit,AfterViewInit {
//   displayedColumns: string[] = ['id','nombre','estado'];
//   private roles!:IRol[];
//   dataSource =new MatTableDataSource<IRol>(this.roles);
//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;
 
//   constructor(
//     private _rolservice:RolService
//   ){

//   }
//   ngAfterViewInit(): void {
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//   }
//   ngOnInit(): void {
//     this.obtenerRoles();
//   }
//   obtenerRoles(){
//     this._rolservice.obtenerRoles().subscribe((resp)=>{
//         this.dataSource.data=resp;
//        console.log(this.dataSource.data);
//     },
//     (e)=>{
//       console.log(e.error);
//     })
//   }
// }
