import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AddProductoMaterialDTO } from '../../class/AddProductoMaterialDTO';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http: HttpClient) { }

  getProductoMaterialByProductId(productId: number, search: string) {
    return this.http.get(`${environment.GET_PRODUCTOMATERIAL}/all?productoId=${productId}&search=${search}`).pipe(map(this.extractData));
  }

  deleteProductoMaterial(productoMaterialId: number) {
    return this.http.delete(`${environment.GET_MATERIALS}/delete?productoMaterialId=${productoMaterialId}`);
  }

  addProductoMaterial(addProductoMaterial: AddProductoMaterialDTO){
    return this.http.post(`${environment.GET_PRODUCTOMATERIAL}/add`, addProductoMaterial);
  }

  getMaterials(page: number, search: string) {
    return this.http.get(`${environment.GET_MATERIALS}/all?search=${search}&page=${page}`).pipe(map(this.extractData));
  }

  getMaterial(materialId: number) {
    return this.http.get(`${environment.GET_MATERIALS}/byId?materialId=${materialId}`).pipe(map(this.extractData));
  }

  deleteMaterial(materialId: number) {
    return this.http.delete(`${environment.GET_MATERIALS}/delete?materialId=${materialId}`);
  }


  private extractData(res) {
    const body = res;
    return body;
  }
}
