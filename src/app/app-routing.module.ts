import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',   redirectTo: '/testes', pathMatch: 'full' },
  { path: 'testes', loadChildren: () => import('./modules/testes/testes.module').then(m => m.TestesModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
