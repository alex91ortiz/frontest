import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-eliminarproducto',
  templateUrl: './eliminarproducto.component.html',
  styleUrls: ['./eliminarproducto.component.scss']
})
export class EliminarproductoComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<EliminarproductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
