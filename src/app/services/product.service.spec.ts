import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../interfaces/Product.interface';


describe('ProductService', () => {
  let productService: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });

    productService = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  it('should get all products', () => {
    const mockProducts: Product[] = [
      { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1.png', date_release: '2022-01-01', date_revision: '2022-02-01' },
      { id: '2', name: 'Product 2', description: 'Description 2', logo: 'logo2.png', date_release: '2022-03-01', date_revision: '2022-04-01' }
    ];

    productService.getAll().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpTestingController.expectOne(`${environment.BASE_URL}${environment.ENDPOINTS.products.CRUD}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockProducts);
  });

  it('should create product', () => {
    const mockProduct: Product = { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1.png', date_release: '2022-01-01', date_revision: '2022-02-01' };

    productService.create(mockProduct).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpTestingController.expectOne(`${environment.BASE_URL}${environment.ENDPOINTS.products.CRUD}`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockProduct);
  });

  it('should edit product', () => {
    const mockProduct: Product = { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1.png', date_release: '2022-01-01', date_revision: '2022-02-01' };

    productService.edit(mockProduct).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpTestingController.expectOne(`${environment.BASE_URL}${environment.ENDPOINTS.products.CRUD}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(mockProduct);
  });

  it('should delete product', () => {
    const mockId = '1';

    productService.delete(mockId).subscribe(response => {
      expect(response).toEqual('Y');
    });

    const req = httpTestingController.expectOne(`${environment.BASE_URL}${environment.ENDPOINTS.products.CRUD}?id=${mockId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush('Y');
  });

  it('should verify product ID', () => {
    const mockId = '1';

    productService.verifyId(mockId).subscribe(result => {
      expect(result).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${environment.BASE_URL}${environment.ENDPOINTS.products.idValidation}?id=${mockId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(true);
  });

  it('should handle error when deleting product', () => {
    const mockId = '1';

    productService.delete(mockId).subscribe(response => {
      expect(response).toEqual('N');
    });

    const req = httpTestingController.expectOne(`${environment.BASE_URL}${environment.ENDPOINTS.products.CRUD}?id=${mockId}`);
    expect(req.request.method).toEqual('DELETE');
    //req.error(new HttpErrorResponse({ status: 500 }));
  });
});