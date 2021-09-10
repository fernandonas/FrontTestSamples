import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestesRoutingModule } from './testes-routing.module';
import { FormsModule } from '@angular/forms';
import { TestesComponent } from './pages/testes/testes.component';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';


@NgModule({
  declarations: [TestesComponent, ButtonComponent],
  imports: [
    RouterModule,
    CommonModule,
    TestesRoutingModule,
    FormsModule
  ]
})
export class TestesModule { }
