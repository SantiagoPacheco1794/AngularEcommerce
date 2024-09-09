import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' ;
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = 'https://api.mercadolibre.com/sites/MLA/search?q=ipod';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getProductDetail(productId: string): Observable<any> {
    const detailUrl = `https://api.mercadolibre.com/items/${productId}`;
    return this.http.get<any>(detailUrl);
  }
}
