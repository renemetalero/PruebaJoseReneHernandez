import { TestBed } from '@angular/core/testing';
import { LoadService } from './loading.service';


describe('LoadingService', () => {
  let service: LoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
