import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appFeedback]'
})
export class FeedbackDirective implements OnInit{

  @Input() errorMessages: Record<string, string> = {}

  constructor(
    private elementRef: ElementRef,
    private control: NgControl
  ) { }

  get parent() {return this.elementRef?.nativeElement.parentElement}

  ngOnInit(): void {
    this.control?.statusChanges?.subscribe({
      next: val => {
        if(val === 'INVALID' && (this.control.touched || this.control.dirty)) {
          this.showErrors()
          this.elementRef.nativeElement.style.border = '2px solid red'
        } else if(val === 'VALID' && this.control.dirty){
          this.resetErrorLabels()
          this.elementRef.nativeElement.style.border = '1px solid grey'
        }
      }
    })
  }


  showErrors() {
    this.resetErrorLabels()
    Object.keys({...this.control.errors}).forEach(key => {
      const span = document.createElement('span')
      span.textContent = this.errorMessages[key]
      span.style.color = 'red'
      this.parent.appendChild(span)
    })
  }

  resetErrorLabels() {
    const spans = [...this.parent.querySelectorAll('span')]
    spans.forEach(el => {
      el.remove()
    })
  }

}
