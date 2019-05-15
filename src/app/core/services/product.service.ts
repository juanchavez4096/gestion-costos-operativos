import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(`${environment.GET_PRODUCTS}/all`).pipe(map(this.extractData));
  }

  getProduct(productoId: number) {
    return this.http.get(`${environment.GET_PRODUCTS}/byId?productoId=${productoId}`).pipe(map(this.extractData));
  }

  private extractData(res) {
    const body = res;
    return body;
  }
}
