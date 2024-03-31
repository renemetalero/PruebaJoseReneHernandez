import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColumnTableI } from 'src/app/interfaces/Table.interface';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent {
  @Input() columns: ColumnTableI[] = []
  @Input() data: any[] = []
  @Output() edit = new EventEmitter<unknown>()
  @Output() delete = new EventEmitter<unknown>()


  onEdit(data: unknown) {
    this.edit.emit(data)
  }

  onDelete(data: unknown) {
    this.delete.emit(data)
  }
}
