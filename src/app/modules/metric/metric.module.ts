import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetricRoutingModule } from './metric-routing.module';
import { MetricComponent } from './metric.component';
import { SharedModule } from '../shared/shared.module';
import { MetricService } from './services/metric.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@NgModule({
  declarations: [
    MetricComponent
  ],
  imports: [
    CommonModule,
    MetricRoutingModule,
    SharedModule
  ],
  providers: [
    MetricService,
    NzMessageService
  ]
})
export class MetricModule { }
