import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NovaEntregaComponent } from './components/template/nova-entrega/nova-entrega.component';
import { HomeComponent } from './components/template/home/home.component';
import { ListaEntregasComponent } from './lista-entregas/lista-entregas.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  { path: 'nova-entrega', component: NovaEntregaComponent },
  { path: 'lista-entrega', component: ListaEntregasComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'edicao/:id', component: NovaEntregaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
