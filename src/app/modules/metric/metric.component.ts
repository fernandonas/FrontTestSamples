import { Component } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { IMetricData } from './models/metric-Data';
import { MetricService } from './services/metric.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-metric',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.less']
})

export class MetricComponent {
  sub = new Subscription();
  subject = new Subject();
  listOfMetricData: IMetricData[];
  loading: boolean;

  constructor(
    private readonly metricService: MetricService,
    private readonly message: NzMessageService,
  ) { }

  loadMetrics(): void {
    this.getMetrics();
  }

  getMetrics(): void {
    this.loading = true;
    this.sub.add(this.metricService.getMetric().subscribe({
      next: response => {
        if (response.isSuccess) {
          this.listOfMetricData = response.results
          this.loading = false;
        } else {
          this.message.error('Erro ao retornar as métricas!');
        }
      },
      error: error => {
        this.message.error(error.message);
      }
    }))
  }
}
