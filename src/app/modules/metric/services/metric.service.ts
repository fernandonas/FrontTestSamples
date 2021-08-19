import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../../shared/models/response.model';
import { IMetricData } from '../models/metric-Data';

@Injectable()
export class MetricService {
  private readonly apiUrl = 'http://localhost:9000'

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getMetric(): Observable<IResponse<IMetricData>> {
    return this.httpClient.get(`${this.apiUrl}/metric`) as Observable<IResponse<IMetricData>>
  }
}
