import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestesRoutingModule } from './testes-routing.module';
import { TestesComponent } from './testes.component';


@NgModule({
  declarations: [TestesComponent],
  imports: [
    CommonModule,
    TestesRoutingModule
  ]
})
export class TestesModule { }
