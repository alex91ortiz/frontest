import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 1
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  listAll() {
    return this.http.get<any>(`http://localhost:8080/producto/`);
  }

  save(producto: any) {
    return new Promise(resolve => {
      this.http.post(`http://localhost:8080/producto/`, producto)
        .subscribe(resp => {
          resolve(true);
        });
    });
  }

  update(id: any, producto: any) {
    return new Promise(resolve => {
      this.http.put(`http://localhost:8080/producto/${id}`, producto)
        .subscribe(resp => {
          resolve(true);
        });
    });
  }

  delete(id: any) {
    return new Promise(resolve => {
      this.http.delete(`http://localhost:8080/producto/${id}`)
        .subscribe(resp => {
          resolve(true);
        });
    });
  }
  
}
