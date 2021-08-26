import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './modules/layout/components/main-layout/main-layout.component';
import { MenuButtonComponent } from './modules/shared/components/menu-button/menu-button.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'teste', component: MenuButtonComponent },
      { path: 'metric', loadChildren: () => import('./modules/metric/metric.module').then(m => m.MetricModule) }
    ]
  },
  { path: 'testes', loadChildren: () => import('./modules/testes/testes.module').then(m => m.TestesModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
