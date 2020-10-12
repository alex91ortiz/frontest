import { Component, OnInit, Inject } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { AgregarproductoComponent } from '../modal/agregarproducto/agregarproducto.component';
import { EliminarproductoComponent } from '../modal/eliminarproducto/eliminarproducto.component';

import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'nombre', 'precio', 'accion'];
  productos: any[] = null;
  producto: any;
  constructor(private productoService: ProductoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadListProducto();
  }

  openDialogo(accion: string) {

    if (accion == "Crear") {
      const dialogRef = this.dialog.open(AgregarproductoComponent, {
        data: { codigo: "", nombre: "", stock: 0, valorUnidad: 0, accion: accion }
      });
      dialogRef.afterClosed().subscribe(pro => {
        if (pro != undefined) {
          this.addProducto(pro);
        }
      });
    } else if (accion == "Editar") {
      const dialogRef = this.dialog.open(AgregarproductoComponent, {
        data: this.producto
      });
      dialogRef.afterClosed().subscribe(pro => {
        if (pro != undefined) {
          this.updateProducto(pro.idProducto, pro);
        }
      });
    } else if (accion == "Eliminar") {
      const dialogRef = this.dialog.open(EliminarproductoComponent, {
        data: this.producto
      });
      dialogRef.afterClosed().subscribe(pro => {
        if (pro != undefined) {
          this.deleteProducto(pro.idProducto);
        }
      });
    }
  }

  loadListProducto() {
    this.productoService.listAll().subscribe(resul => {
      this.productos = resul;
    })
  }

  addProducto(producto: any) {
    this.productoService.save(producto).then(resul => {
      this.loadListProducto();
    });
  }

  setProducto(producto: any, accion: string) {
    this.producto = producto;
    this.openDialogo(accion);
  }

  updateProducto(id: any, producto: any) {
    this.productoService.update(id, producto).then(resul => {
      this.loadListProducto();
    });
  }

  deleteProducto(id: any){
    this.productoService.delete(id).then(resul => {
      this.loadListProducto();
    });
  }

}
