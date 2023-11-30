import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NovaEntregaComponent } from './components/template/nova-entrega/nova-entrega.component';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'nova-entrega', component: NovaEntregaComponent},
  {path: 'inicio', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
