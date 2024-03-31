import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-filter-field',
  templateUrl: './filter-field.component.html',
  styleUrls: ['./filter-field.component.css']
})
export class FilterFieldComponent implements OnInit{
  private searchSubject = new Subject<string>();
  private debounceTimeMs: number = 1000
  @Output() search = new EventEmitter<string>()

  ngOnInit(): void{
    this.searchSubject.pipe(debounceTime(this.debounceTimeMs)).subscribe((searchValue) => {
       this.search.emit(searchValue)
    });
  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }

  onSearch(value: string) {
    this.searchSubject.next(value)
  }
}
