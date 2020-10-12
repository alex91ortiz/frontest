import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-eliminarcliente',
  templateUrl: './eliminarcliente.component.html',
  styleUrls: ['./eliminarcliente.component.scss']
})
export class EliminarclienteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EliminarclienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
