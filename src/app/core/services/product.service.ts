import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(page: number,search: string) {
    return this.http.get(`${environment.GET_PRODUCTS}/all?search=${search}&page=${page}`).pipe(map(this.extractData));
  }

  getProduct(productoId: number) {
    return this.http.get(`${environment.GET_PRODUCTS}/byId?productoId=${productoId}`).pipe(map(this.extractData));
  }

  addProduct(product: FormData) {
    return this.http.post(`${environment.GET_PRODUCTS}/add`, product, {reportProgress: true, observe: 'events'});
  }

  private extractData(res) {
    const body = res;
    return body;
  }
}
