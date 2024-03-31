import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, catchError, debounceTime, delay, distinctUntilChanged, map, of } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { minorDateValidator, yearHigherValidator } from '../../utils/validators';
import { Alert } from 'src/app/components/alert/alert.component';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/Product.interface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit{

  form!: FormGroup
  type: Alert = 'success'
  alertText: string = ''
  selectedProduct!: Product;
  subscription!: Subscription

  errorMessages = {
    id: {
      required: 'El ID es requerido',
      minlength: 'Minimo 3 caracteres',
      maxlength:'Maximo 10 caracteres',
      idTaken: 'ID ya esta tomado',
    },
    name: {
      required: 'El nombre es requerido',
      minlength: 'minimo 5 caracteres',
      maxlength: 'Maximo 100 caracteres'
    },
    description: {
      required: 'La descripcion es requerida',
      minlength: 'Minimo 10 caracteres',
      maxlength: 'Maximo 200 caracteres'
    },
    logo: {
      required: 'El logo es requerido'
    },
    date_release : {
      required: 'La fecha Liberacion es requerida',
      minordate:'La fecha debe ser mayor a la actual'
    },
    date_revision: {
      required: 'La fecha revision es requerida',
      yearnothigher:'La fecha debe ser un anio mayor a la fecha liberacion'
    }

  }

  get f_id() { return this.form ? this.form.get('id') : null}
  get f_name() { return this.form ? this.form.get('name') : null}
  get f_description() { return this.form ? this.form.get('description') : null}
  get f_logo() { return this.form ? this.form.get('logo') : null}
  get f_date_release() { return this.form ? this.form.get('date_release') : null}
  get f_date_revision() { return this.form ? this.form.get('date_revision') : null}

  constructor(
    private fb: FormBuilder,
    public productService: ProductService,
  ) {

  }
  ngOnInit(): void {
    this.listenSelectedProduct()
    this.initForm()
    this.setFormvalues()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }


  initForm() {
    this.form = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', [Validators.required]],
      date_release: ['', [Validators.required, minorDateValidator()]],
      date_revision: ['', [Validators.required, yearHigherValidator('date_release')]],
    })
  }

  listenSelectedProduct() {
    if(localStorage.getItem('product')) this.selectedProduct = JSON.parse(localStorage.getItem('product')!)
    if(!this.productService?.selected) return
    this.subscription = this.productService?.selected?.subscribe({
      next: prod => {
        if(!prod) return
        localStorage.setItem('product', JSON.stringify(prod))
        this.selectedProduct = prod!
      }
    })
  }

  setFormvalues() {
    if(this.selectedProduct) {
      this.form.setValue({
        ...this.selectedProduct,
        date_release: new Date(this.selectedProduct.date_release).toISOString().split('T')[0],
        date_revision: new Date(this.selectedProduct.date_revision).toISOString().split('T')[0]
      })
    }
  }

  sendData() {
    if(this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }
    if(!this.selectedProduct) {
      this.productService.create(this.form.value).subscribe({
        next: res => {
          this.alertText = 'Producto creado con exito'
          this.type = 'success'
          this.form.reset()
        },
        error: err => {
          this.alertText = 'Ocurrio un error al crear el producto'
          this.type = 'error'
        }
      })
      return
    }
    this.productService.edit(this.form.value).subscribe({
      next: res => {
        this.alertText = 'Producto editado con exito'
        this.type = 'success'
      },
      error: err => {
        this.alertText = 'Ocurrio un error al editar el producto'
        this.type = 'error'
      }
    })
  }

  onValidateId(value: string) {
    console.log(this.form);

    this.productService.verifyId(value).subscribe({
      next: (value) => {
          if(value) {
            this.f_id?.setErrors({idTaken: true})
          } else {
            const errors = this.f_id?.errors ? {...this.f_id?.errors} : null
            this.f_id?.setErrors(errors )
          }
      }
    }) // En caso de error en la solicitud, se considera válido
  }


  dateReleaseChange() {
    this.f_date_revision?.updateValueAndValidity()
  }

}
