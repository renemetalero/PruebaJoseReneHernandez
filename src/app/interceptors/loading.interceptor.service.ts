import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http'
import { finalize, Observable } from 'rxjs'
import { LoadService } from '../services/loading.service'

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadService: LoadService) {}
  private totalRequests = 0
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.totalRequests++
      this.loadService.show()
    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--
        if(this.totalRequests === 0) {
           this.loadService.hide()
        }
      })
    )
  }
}
