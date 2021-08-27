import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    NzTableModule
  ],
  exports: [
    NzTableModule
  ]
})
export class SharedModule { }
