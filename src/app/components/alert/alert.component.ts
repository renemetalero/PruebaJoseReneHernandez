import { Component, Input } from '@angular/core';

export type Alert = 'error' | 'success' | 'warning' | 'info'

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() set type(val: Alert) {
    this._type = val
  }
  @Input() set message(val: string) {
    this._message = val
    setTimeout(() => {
      this._message = ''
    }, 5000);
  }
  _type: Alert = 'info'

  _message: string = ''



}
