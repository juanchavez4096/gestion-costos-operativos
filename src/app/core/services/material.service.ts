import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http: HttpClient) { }

  getMaterials() {
    return this.http.get(`${environment.GET_MATERIALS}/all`).pipe(map(this.extractData));
  }

  getMaterial(materialId: number) {
    return this.http.get(`${environment.GET_MATERIALS}/byId?materialId=${materialId}`).pipe(map(this.extractData));
  }


  private extractData(res) {
    const body = res;
    return body;
  }
}
