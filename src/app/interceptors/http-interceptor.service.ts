import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clona la solicitud original para no modificarla directamente
    const modifiedRequest = request.clone({
      setHeaders: {
        'authorId': '1'
      }
    });
    // Continúa con la solicitud modificada
    return next.handle(modifiedRequest)

  }
}
