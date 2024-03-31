import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormControl, NgControl, FormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FeedbackDirective } from './feedback.directive';

@Component({
  template: `
    <input [formControl]="control" appFeedback [errorMessages]="errorMessages">
  `
})
class TestComponent {
  control = new FormControl();
  errorMessages = {
    required: 'Este campo es requerido',
    minlength: 'Debe tener al menos 3 caracteres'
  };
}

describe('FeedbackDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, FeedbackDirective],
      imports: [ReactiveFormsModule, FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error messages when control is invalid and touched', () => {
    component.control.setValidators([Validators.required]);
    component.control.markAsTouched();
    component.control.setValue('');

    fixture.detectChanges();
    const errorMessageEl = fixture.nativeElement.querySelector('span')

    expect(errorMessageEl.textContent).toContain(component.errorMessages.required);
  });

  it('should remove error messages when control becomes valid', () => {
    component.control.setValidators([Validators.required]);
    component.control.markAsTouched();
    component.control.markAsDirty();
    component.control.setValue('');
    component.control.updateValueAndValidity()
    fixture.detectChanges();
    let errorMessageEl = fixture.nativeElement.querySelector('span')

    expect(errorMessageEl).toBeTruthy();
    component.control.setValue('valid value');
    fixture.detectChanges();
     errorMessageEl = fixture.nativeElement.querySelector('span')
    expect(errorMessageEl).toBeFalsy();
  });

  // Add more tests as needed

});
