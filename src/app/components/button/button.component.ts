import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() type: 'button' | 'reset' | 'submit' = 'button'
  @Input() rounded: boolean = false
  @Input() color: string = 'orange'
  @Input() disabled: boolean = false
}
