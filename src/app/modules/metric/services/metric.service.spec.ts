import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IResponse } from '../../shared/models/response.model';
import { IMetricData } from '../models/metric-Data';

import { MetricService } from './metric.service';

describe('MetricService', () => {
  let service: MetricService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        MetricService
      ]
    });
    service = TestBed.inject(MetricService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should get metrics', () => {
    const metric: IMetricData =
    {
      metricName: "MetricName",
      value: 80
    }
    const responseWithMetricData: IResponse<IMetricData> = {
        isSuccess: true,
        message: 'success',
        results: [metric]
      }
      service.getMetric().subscribe({
          next: response => {
              expect(response.isSuccess).toBeTrue();
              expect(response.results).toEqual([metric]);
          }
      });

     const req = httpTestingController.expectOne('http://localhost:9000/metric');
     expect(req.request.method).toEqual('GET');
     req.flush(responseWithMetricData);
     httpTestingController.verify();
  })
});
