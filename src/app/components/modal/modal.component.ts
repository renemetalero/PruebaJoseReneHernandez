import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @ViewChild('dialog') $dialog!: ElementRef
  @Output() confirm = new EventEmitter<boolean>()
  @Output() cancel = new EventEmitter<boolean>()
  @Input() set show(val:boolean) {
    this._show = val
    if(!this.$dialog) return
    if(val) {
      this.$dialog.nativeElement.showModal()
    } else {
      this.$dialog.nativeElement.close()
    }
  }
  _show: boolean = false

  onConfirm() {
    this.confirm.emit(true)
  }
  onCancel() {
    this.cancel.emit(false)
  }

}
