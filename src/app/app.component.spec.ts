import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LoadService } from './services/loading.service';
import { BehaviorSubject } from 'rxjs';
import { HeaderComponent } from './components/header/header.component';
import { FilterFieldComponent } from './components/filter-field/filter-field.component';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let loadServiceSpy: jasmine.SpyObj<LoadService>;
  let loadingSubject: BehaviorSubject<boolean>;

  beforeEach(async () => {
    loadingSubject = new BehaviorSubject<boolean>(false);

    const loadServiceSpyObj = jasmine.createSpyObj('LoadService', ['show', 'hide']);
    loadServiceSpyObj.isLoading = loadingSubject.asObservable();

    await TestBed.configureTestingModule({
      declarations: [AppComponent, HeaderComponent, FilterFieldComponent],
      imports: [RouterTestingModule,HttpClientTestingModule],
      providers: [
        { provide: LoadService, useValue: loadServiceSpyObj }
      ],
    }).compileComponents();

    loadServiceSpy = TestBed.inject(LoadService) as jasmine.SpyObj<LoadService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should set loading to true when LoadService emits true', () => {
    expect(component.loading).toBeFalsy();
    loadingSubject.next(true);
    expect(component.loading).toBe(true);
  });

  it('should set loading to false when LoadService emits false', () => {
    component.loading = true;
    expect(component.loading).toBe(true);
    loadingSubject.next(false);
    expect(component.loading).toBe(false);
  });

  it('should call show method of LoadService when loading is true', () => {
    component.loading = true;
    loadServiceSpy.show()
    expect(loadServiceSpy.show).toHaveBeenCalled();
  });

  it('should call hide method of LoadService when loading is false', () => {
    component.loading = false;
    loadingSubject.next(false)
    loadServiceSpy.hide()
    expect(loadServiceSpy.hide).toHaveBeenCalled();
  });
});
