import { Directive, HostListener, OnInit, Output, EventEmitter } from '@angular/core'
import { debounceTime, Subject } from 'rxjs'

@Directive({
  selector: '[appDebounce]'
})
export class DebounceDirective implements OnInit {

  private debouncer: Subject<string> = new Subject()
  @Output() onDebounce = new EventEmitter<string>()


  ngOnInit(): void {
    this.debouncer.pipe(
      debounceTime(500)
    ).subscribe({
      next: valor => {
        this.onDebounce.emit(valor)
      }
    })

  }

  @HostListener('input', ['$event'])
  onChange(evt: Event) {
    this.debouncer.next( (evt.target as HTMLInputElement).value)
  }

}
