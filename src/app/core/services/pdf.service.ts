import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class PdfService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  generatePdf(desde: Date, hasta: Date, type: string) {
    return this.http.get(`${environment.GET_PDF}/downloadPdf?desde=${desde}&hasta=${hasta}&type=${type}`, { 
      headers: new HttpHeaders({ 'Accept': 'application/pdf' }), 
      responseType: 'blob' 
    });
  }

  

  private extractData(res) {
    const body = res;
    return body;
  }
}
