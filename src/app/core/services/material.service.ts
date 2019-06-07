import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AddProductoMaterialDTO } from '../../class/AddProductoMaterialDTO';
import { MaterialDTO } from '../../class/MaterialDTO';
import { ModifyProductoMaterialDTO } from '../../class/ModifyProductoMaterialDTO';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http: HttpClient) { }

  getTipoUnidad(tipoUnidadId: number) {
    if (tipoUnidadId) {
      return this.http.get(`${environment.GET_MATERIALS}/allTipoUnidad?tipoUnidadId=${tipoUnidadId}`).pipe(map(this.extractData));
    }else{
      return this.http.get(`${environment.GET_MATERIALS}/allTipoUnidad`).pipe(map(this.extractData));
    } 
  }

  getProductoMaterialByProductId(page: number, productId: number, search: string) {
    return this.http.get(`${environment.GET_PRODUCTOMATERIAL}/all?productoId=${productId}&search=${search}&page=${page}`).pipe(map(this.extractData));
  }

  getProductoMaterialByProductMaterialId(productMaterialId: number) {
    return this.http.get(`${environment.GET_PRODUCTOMATERIAL}/byId?productoMaterialId=${productMaterialId}`).pipe(map(this.extractData));
  }

  deleteProductoMaterial(productoMaterialId: number) {
    return this.http.delete(`${environment.GET_PRODUCTOMATERIAL}/delete?productoMaterialId=${productoMaterialId}`);
  }

  addProductoMaterial(addProductoMaterial: AddProductoMaterialDTO){
    return this.http.post(`${environment.GET_PRODUCTOMATERIAL}/add`, addProductoMaterial);
  }

  updateProductoMaterial(modifyProductoMaterialDTO: ModifyProductoMaterialDTO) {
    return this.http.put(`${environment.GET_PRODUCTOMATERIAL}/update`, modifyProductoMaterialDTO);
  }

  getMaterials(page: number, search: string) {
    return this.http.get(`${environment.GET_MATERIALS}/all?search=${search}&page=${page}`).pipe(map(this.extractData));
  }

  getAllMaterials(){
    return this.http.get(`${environment.GET_MATERIALS}/allWithOutPage`).pipe(map(this.extractData));
  }

  getMaterial(materialId: number) {
    return this.http.get(`${environment.GET_MATERIALS}/byId?materialId=${materialId}`).pipe(map(this.extractData));
  }

  addMaterial(formData: FormData){
    return this.http.post(`${environment.GET_MATERIALS}/add`, formData, {reportProgress: true, observe: 'events'});
  }

  updateMaterial(material: MaterialDTO) {
    return this.http.put(`${environment.GET_MATERIALS}/update`, material);
  }

  deleteMaterial(materialId: number) {
    return this.http.delete(`${environment.GET_MATERIALS}/delete?materialId=${materialId}`);
  }


  private extractData(res) {
    const body = res;
    return body;
  }
}
