import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private http: HttpClient) { }

  findClienteByidentificacion(identificacion: string) {
    return this.http.get<any>(`http://localhost:8080/buscarcliente/${identificacion}`);
  }

  findProductoByNombre(nombre: string) {
    return this.http.get<any>(`http://localhost:8080/buscarproducto/${nombre}`);
  }

  findProductoByCodigo(codigo: string) {
    return this.http.get<any>(`http://localhost:8080/agregarproducto/${codigo}`);
  }

  save(factura: any) {
    return new Promise(resolve => {
      this.http.post(`http://localhost:8080/factura/`, factura)
        .subscribe(resp => {
          resolve(true);
        });
    });
  }
}
