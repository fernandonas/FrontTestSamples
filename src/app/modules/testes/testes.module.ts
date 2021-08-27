import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestesRoutingModule } from './testes-routing.module';
import { FormsModule } from '@angular/forms';
import { TestesComponent } from './pages/testes/testes.component';


@NgModule({
  declarations: [TestesComponent],
  imports: [
    CommonModule,
    TestesRoutingModule,
    FormsModule
  ]
})
export class TestesModule { }
