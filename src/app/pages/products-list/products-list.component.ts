import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from 'src/app/components/alert/alert.component';
import { Product } from 'src/app/interfaces/Product.interface';
import { ColumnTableI } from 'src/app/interfaces/Table.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  columnsTable: ColumnTableI[] = [
    {label:'Logo', name:'logo', html: (record) =>  {
      const logoUrl = this.isValidUrl(record.logo) ? record.logo : 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';
      return `<img class="rounded table-img" src="${logoUrl}" />`;
    }},
    {label:'Nombre de producto', name:'name'},
    {label:'Descripcion', name:'description'},
    {label:'Fecha de Liberacion', name:'date_release'},
    {label:'Fecha de reestructuracion', name:'date_revision'},
  ]

  type: Alert = 'success'

  alertText: string = ''

  products: Product[] = []

  searchValue: string = ''

  showDialog: boolean = false

  productSelected!: Product

  constructor(
    private productService: ProductService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(): void {
    this.productService.getAll().subscribe({
      next: products => {
        this.products = products.map(el => ({...el,
          date_release: new Date(el.date_release).toLocaleDateString(),
          date_revision: new Date(el.date_revision).toLocaleDateString()
        }))
      }
    })
  }

  delete(id: string) {
    this.productService.delete(id).subscribe({
      next: res => {
        this.type = 'success'
        this.alertText = 'Producto eliminado con exito'
        this.products = this.products.filter(el => el.id !== this.productSelected.id!)
      },
      error: err => {
        console.log(err);

        this.type = 'error'
        this.alertText = 'Ocurrio un error al eliminar el producto'
      }
    })
  }

  isValidUrl(url: string): boolean {
    // Expresión regular para verificar si la cadena es una URL válida
    const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return pattern.test(url);
  }

  onSearch(value: string) {
    this.searchValue = value
  }

  redirectForm() {
    this.productService.selected.next(null)
    localStorage.clear()
    this.router.navigateByUrl('/product-form')
  }

  onEdit(record: unknown) {
    const product = record as Product
    this.productService.selected.next(product)
    this.router.navigateByUrl('/product-form')

  }

  onDelete(record: unknown) {
    const product = record as Product
    this.productSelected = product
    this.showDialog = true
  }

  onConfirm() {
    this.showDialog = false
    this.delete(this.productSelected.id!)
  }

  onCancel() {
    this.showDialog = false
  }
 }
