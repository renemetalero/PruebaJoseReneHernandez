import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from './product-form.component';
import { ProductService } from 'src/app/services/product.service';
import { BehaviorSubject, of } from 'rxjs';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { FilterFieldComponent } from 'src/app/components/filter-field/filter-field.component';
import { FeedbackDirective } from 'src/app/directives/feedback.directive';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    const productServiceSpyObj = jasmine.createSpyObj('ProductService', ['selected', 'create', 'edit', 'verifyId']);
    productServiceSpyObj.selected = new BehaviorSubject<any>({
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'test-logo.png',
      date_release: new Date().toISOString(),
      date_revision: new Date().toISOString()
    }); // Espía el método asObservable()

    await TestBed.configureTestingModule({
      declarations: [ ProductFormComponent, AlertComponent, ButtonComponent, FilterFieldComponent, FeedbackDirective ],
      imports: [ ReactiveFormsModule ],
      providers: [
        { provide: ProductService, useValue: productServiceSpyObj }
      ]
    })
    .compileComponents();

    const mockProduct = {
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'test-logo.png',
      date_release: new Date().toISOString(),
      date_revision: new Date().toISOString()
    };

    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    //productServiceSpyObj.selected.asObservable.and.returnValue(of(mockProduct)); // Configura el espía para devolver un observable simulado

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.form).toBeDefined();
  });

  it('should set form values from selected product', () => {
    const convertDate = (date: Date): string => {
      // Get year, month, and day part from the date
    const year = date.toLocaleString("default", { year: "numeric" });
    const month = date.toLocaleString("default", { month: "2-digit" });
    const day = date.toLocaleString("default", { day: "2-digit" });

    // Generate yyyy-mm-dd date string
    return  year + "-" + month + "-" + day;
    }
    const mockProduct = {
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'test-logo.png',
      date_release: convertDate(new Date()),
      date_revision: convertDate(new Date())
    };
    console.log();

    component.selectedProduct = mockProduct;
    component.setFormvalues();
    expect(component.form.value).toEqual(mockProduct);
  });

  it('should mark form as touched when sendData is called with invalid form', () => {
    spyOn(component.form, 'markAllAsTouched');
    component.sendData();
    expect(component.form.markAllAsTouched).toHaveBeenCalled();
  });



  it('should set idTaken error if verifyId returns true', () => {
    const mockId = '1';
    productServiceSpy.verifyId.and.returnValue(of(true));
    component.onValidateId(mockId);
    expect(component.f_id?.hasError('idTaken')).toBeTrue();
  });

  it('should not set idTaken error if verifyId returns false', () => {
    const mockId = '1';
    productServiceSpy.verifyId.and.returnValue(of(false));
    component.onValidateId(mockId);
    expect(component.f_id?.hasError('idTaken')).toBeFalse();
  });

  // Add more tests as needed...
});
