import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestesRoutingModule } from './testes-routing.module';
import { TestesComponent } from './testes.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [TestesComponent],
  imports: [
    CommonModule,
    TestesRoutingModule,
    FormsModule
  ]
})
export class TestesModule { }
