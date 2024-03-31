import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { HeaderComponent } from './components/header/header.component';
import { CustomTableComponent } from './components/custom-table/custom-table.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorService } from './interceptors/http-interceptor.service';
import { FilterFieldComponent } from './components/filter-field/filter-field.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ButtonComponent } from './components/button/button.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor.service';
import { DebounceDirective } from './directives/debounce.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { FeedbackDirective } from './directives/feedback.directive';
import { AlertComponent } from './components/alert/alert.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    ProductFormComponent,
    HeaderComponent,
    CustomTableComponent,
    FilterFieldComponent,
    FilterPipe,
    ButtonComponent,
    LoaderComponent,
    DebounceDirective,
    FeedbackDirective,
    AlertComponent,
    DropdownComponent,
    ModalComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
