import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-agregarproducto',
  templateUrl: './agregarproducto.component.html',
  styleUrls: ['./agregarproducto.component.scss']
})
export class AgregarproductoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AgregarproductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) 
  { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
