import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { EventEmitter } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent, ButtonComponent],
      imports: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit confirm event when onConfirm is called', () => {
    const emitSpy = spyOn(component.confirm, 'emit');
    component.onConfirm();
    expect(emitSpy).toHaveBeenCalledWith(true);
  });

  it('should emit cancel event when onCancel is called', () => {
    const emitSpy = spyOn(component.cancel, 'emit');
    component.onCancel();
    expect(emitSpy).toHaveBeenCalledWith(false);
  });

  it('should show modal when show input is true', () => {
    component.$dialog = {
      nativeElement: {
        showModal: jasmine.createSpy('showModal')
      }
    } as any;
    component.show = true;
    expect(component.$dialog.nativeElement.showModal).toHaveBeenCalled();
  });

  it('should close modal when show input is false', () => {
    component.$dialog = {
      nativeElement: {
        close: jasmine.createSpy('close')
      }
    } as any;
    component.show = false;
    expect(component.$dialog.nativeElement.close).toHaveBeenCalled();
  });

});
