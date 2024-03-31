import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LoadService {

  private loadingSubject = new BehaviorSubject<boolean>(false)

  show() {
    this.loadingSubject.next(true)
  }

  hide() {
    this.loadingSubject.next(false)
  }

  get isLoading(): Observable<boolean> {
    return this.loadingSubject.asObservable()
  }
}
