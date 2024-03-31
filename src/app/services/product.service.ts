import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, delay, of } from 'rxjs';
import { Product } from '../interfaces/Product.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  selected = new BehaviorSubject<Product | null>(null)

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.BASE_URL}${environment.ENDPOINTS.products.CRUD}`)
  }
  create(data: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.BASE_URL}${environment.ENDPOINTS.products.CRUD}`, data)
  }

  edit(data: Product): Observable<Product> {
    return this.http.put<Product>(`${environment.BASE_URL}${environment.ENDPOINTS.products.CRUD}`, data)
  }

  delete(id: string): Observable<string> {
    return this.http.delete<string>(`${environment.BASE_URL}${environment.ENDPOINTS.products.CRUD}?id=${id}`).pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status === 200) return of('Y')
        else return of('N')
      })
    )
  }

  verifyId(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.BASE_URL}${environment.ENDPOINTS.products.idValidation}?id=${id}`)
  }
}
