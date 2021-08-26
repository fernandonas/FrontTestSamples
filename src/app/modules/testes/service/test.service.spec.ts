import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { Dados } from '../models/dados.model';
import { dadosMock } from '../models/mocks/_dados.mock';
import { TestService } from './test.service';

describe('TestService', () => {
  let testService: TestService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    testService = TestBed.inject(TestService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(testService).toBeTruthy();
  });

  it('Deve retornar os Dados', () => {
    testService.retornaListaDeDados().subscribe({
      next: (response: Dados[]) => {
        expect(response).toEqual([dadosMock])
      }
    });
    const req = httpTestingController.expectOne(`http://localhost:9000/dados`);
    expect(req.request.method).toEqual('GET');
    req.flush([dadosMock]);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
