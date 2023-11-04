import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import { IVisita } from 'src/app/core/interfaces/visita';
import { VisitaService } from 'src/app/core/services/visita.service';
import { DateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-dialog-detail-visit',
  templateUrl: './dialog-detail-visit.component.html',
  styleUrls: ['./dialog-detail-visit.component.css']
})
export class DialogDetailVisitComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogDetailVisitComponent>,
    private _visitaService: VisitaService,
    @Inject(MAT_DIALOG_DATA) public data:any) {
    }
  ngOnInit() {
    console.log(this.data);
  }
}
