import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MetricComponent } from './metric.component';
import { MetricService } from './services/metric.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MetricModule } from './metric.module';
import { Observable } from 'rxjs';
import { IResponse } from '../shared/models/response.model';
import { IMetricData } from './models/metric-Data';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MetricComponent', () => {
  let component: MetricComponent;
  let fixture: ComponentFixture<MetricComponent>;
  let metricService: MetricService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetricComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MetricModule
      ],
      providers: [
        MetricService,
        NzMessageService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    metricService = TestBed.inject(MetricService);
    fixture = TestBed.createComponent(MetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get metrics', () => {
    const metric: IMetricData =
    {
      metricName: "MetricName",
      value: 80
    }
    const observableReturn = new Observable<IResponse<IMetricData>>(obs => {
      const response: IResponse<IMetricData> = {
        isSuccess: true,
        message: 'success',
        results: [metric]
      }
      obs.next(response);
    })
    spyOn(metricService, 'getMetric').and.returnValue(observableReturn);
    component.getMetrics();
    expect(component.listOfMetricData).toEqual([metric]);
    expect(component.loading).toBeFalse();
  });

  it('should not get metrics if isSuccess is false', () => {
    const observableReturn = new Observable<IResponse<IMetricData>>(obs => {
      const response: IResponse<IMetricData> = {
        isSuccess: false,
        message: 'Erro ao retornar a métrica',
        results: null
      }
      obs.next(response);
    })
    spyOn(metricService, 'getMetric').and.returnValue(observableReturn);
    component.getMetrics();
    expect(component.listOfMetricData).toEqual(undefined);
  });

  it('should not get metrics if service returns error', () => {
    const observableReturn = new Observable<IResponse<IMetricData>>(obs => {
      const response: IResponse<IMetricData> = {
        isSuccess: false,
        message: 'Erro ao retornar a métrica',
        results: null
      }
      obs.error(response);
    })
    spyOn(metricService, 'getMetric').and.returnValue(observableReturn);
    component.getMetrics();
    expect(component.listOfMetricData).toEqual(undefined);
  });

  it('should load mertrics if loadMetrics is called', () => {
    spyOn(component, 'getMetrics');
    component.loadMetrics()
    expect(component.getMetrics).toHaveBeenCalled();
  });
});
