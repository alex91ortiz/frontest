import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { AgregarclienteComponent } from '../modal/agregarcliente/agregarcliente.component';
import { EliminarclienteComponent } from '../modal/eliminarcliente/eliminarcliente.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  displayedColumns: string[] = ['identificacion', 'nombre', 'apellido', 'accion'];
  clientes: any[] = null;
  cliente: any;
  constructor(private clienteService: ClienteService, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.loadListCliente();
  }

  openDialogo(action: string) {

    if (action == "Crear") {
      const dialogRef = this.dialog.open(AgregarclienteComponent, {
        data: { identificacion: 0, nombres: "", apellidos: "", direccion: "", telefono: "", email: "", action: action }
      });
      dialogRef.afterClosed().subscribe(cli => {
        if (cli != undefined) {
          this.addCliente(cli);
        }
      });
    } else if (action == "Editar") {
      const dialogRef = this.dialog.open(AgregarclienteComponent, {
        data: this.cliente
      });
      dialogRef.afterClosed().subscribe(cli => {
        if (cli != undefined) {
          this.updateCliente(cli.idCliente, cli);
        }
      });
    } else if (action == "Eliminar") {
      const dialogRef = this.dialog.open(EliminarclienteComponent, {
        data: this.cliente
      });
      dialogRef.afterClosed().subscribe(pro => {
        if (pro != undefined) {
          this.deleteCliente(pro.idCliente);
        }
      });
    }
  }

  loadListCliente() {
    this.clienteService.listAll().subscribe(resul => {
      this.clientes = resul;
    })
  }

  addCliente(cliente: any) {
    this.clienteService.save(cliente).then(resul => {
      this.loadListCliente();
    });
  }

  setCliente(cliente: any, action: string) {
    this.cliente = cliente;
    this.openDialogo(action);
  }

  updateCliente(id: any, cliente: any) {
    this.clienteService.update(id, cliente).then(resul => {
      this.loadListCliente();
    });
  }

  deleteCliente(id: any) {
    this.clienteService.delete(id).then(resul => {
      this.loadListCliente();
    });
  }

}
