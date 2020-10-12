import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }
  
  listAll() {
    return this.http.get<any>(`http://localhost:8080/cliente/`);
  }

  save(cliente: any) {
    return new Promise(resolve => {
      this.http.post(`http://localhost:8080/cliente/`, cliente)
        .subscribe(resp => {
          resolve(true);
        });
    });
  }

  update(id: any, cliente: any) {
    return new Promise(resolve => {
      this.http.put(`http://localhost:8080/cliente/${id}`, cliente)
        .subscribe(resp => {
          resolve(true);
        });
    });
  }

  delete(id: any) {
    return new Promise(resolve => {
      this.http.delete(`http://localhost:8080/cliente/${id}`)
        .subscribe(resp => {
          resolve(true);
        });
    });
  }
}
