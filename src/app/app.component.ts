import { AfterViewInit, Component } from '@angular/core';
import { LoadService } from './services/loading.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  loading: boolean = false;

  constructor(
    public loadService: LoadService
  ) {}

  ngAfterViewInit(): void {
    this.loadService.isLoading.subscribe({
      next: val => {
          this.loading = val
        }
      })
  }

}
