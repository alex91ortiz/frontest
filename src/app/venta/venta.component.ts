import { Component, OnInit, ViewChild } from '@angular/core';
import { VentaService } from '../services/venta.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  identificacion: any;
  cliente: any;
  titulocliente: String = "Escriba su numero de identificaciòn";
  step = 0;
  mensaje: string = "";
  nombre: string;
  codigo: string;
  myControl = new FormControl();
  productos: any[] = [];
  detalles: any[] = [];
  factura: any;
  filteredOptions: Observable<string[]>;
  displayedColumnsPro: string[] = ['codigo', 'nombre', 'stock', 'cantidad', 'valorUnidad', 'accion'];
  displayedColumnsFac: string[] = ['codigo', 'nombre', 'cantidad', 'valorUnidad', 'valorTotal', 'accion'];
  durationInSeconds = 5;

  constructor(private ventaService: VentaService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  /*openDialogProducto(): void {
    const dialogRef = this.dialog.open(AgregarproductoComponent, {
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.animal = result;
    });
  }*/

  openSnackBar() {
    this._snackBar.openFromComponent(AlertsVentaComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    if (this.step == 0 && this.cliente != null) {
      this.step++;
    } else if (this.step == 1 && this.productos != null) {
      this.step++;
    }

  }

  prevStep() {
    this.step--;
  }

  searchCliente() {
    this.ventaService.findClienteByidentificacion(this.identificacion).subscribe(result => {
      console.log(result);
      result.forEach(res => {
        this.cliente = res;
        this.titulocliente = res.identificacion + " " + res.nombres + " " + res.apellidos;
        this.mensaje = "";
      });
    });
  }

  searchProductoCodigo() {
    this.ventaService.findProductoByCodigo(this.codigo).subscribe(result => {
      this.productos = result;
    });
  }

  searchProductoNombre() {
    this.ventaService.findProductoByNombre(this.nombre).subscribe(result => {
      this.productos = result;
    });
  }

  addProdcutoDetalle(producto: any) {
    this.mensaje = "";
    let detalle = {
      "factura": {
        "cliente": this.cliente
      },
      "producto": producto,
      "cantidad": producto.cantidad,
      "valorUnidad": producto.valorUnidad,
      "valorTotal": (producto.cantidad * producto.valorUnidad)
    }
    let existente = this.detalles.findIndex(pro => pro.producto.codigo === producto.codigo);

    if (existente >= 0) {
      this.detalles[existente].cantidad = producto.cantidad + this.detalles[existente].cantidad;
    } else {
      this.detalles = [...this.detalles, detalle];
    }
    this.productos = [];
    this.codigo = null;
    this.nombre = null;
    this.nextStep();

  }

  removeProdcutoDetalle(codigo: any) {
    let existente = this.detalles.filter(pro => pro.producto.codigo !== codigo);
    if (existente.length >= 0) {
      this.detalles = existente;
    }
  }

  submitFactura() {
    if (this.cliente == null) {
      this.setStep(0);
      this.mensaje = "Debes Agregar un cliente";
      return;
    }
    if (this.detalles.length <= 0) {
      this.setStep(1);
      this.mensaje = "Debes Agregar productos";
      return;
    }
    let facturaDto = {
      "factura": {
        "cliente": this.cliente,
        "valorTotal": this.getTotalCost()
      },
      "facturadetalles": this.detalles
    }

    this.ventaService.save(facturaDto).then(result => {
      this.cliente = null;
      this.detalles = [];
      this.identificacion = null;
      this.titulocliente = "Escriba su numero de identificaciòn";
      this.setStep(0);
      this.openSnackBar();
    });
  }


  getTotalCost() {
    return this.detalles.map(t => t.valorTotal).reduce((acc, value) => acc + value, 0);
  }

  onQuantityChange(detalle: any) {
    let existente = this.detalles.findIndex(pro => pro.producto.codigo === detalle.producto.codigo);
    this.detalles[existente].cantidad = detalle.cantidad;
    this.detalles[existente].valorTotal = detalle.valorUnidad * this.detalles[existente].cantidad;
  }
}

@Component({
  selector: 'snack-bar-component-venta-snack',
  template: `<span class="venta-alert-save">Registro Exitoso</span>`,
  styles: [`
    .venta-alert-save {
      color: amber;
    }
  `],
})
export class AlertsVentaComponent { }
