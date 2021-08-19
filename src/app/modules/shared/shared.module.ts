import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuButtonComponent } from './components/menu-button/menu-button.component';
import { RouterModule } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';



@NgModule({
  declarations: [
    NavbarComponent,
    MenuButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NzTableModule
  ],
  exports: [
    NavbarComponent,
    MenuButtonComponent,
    NzTableModule
  ]
})
export class SharedModule { }
