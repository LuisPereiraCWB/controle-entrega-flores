
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { NovaEntregaComponent } from './components/template/nova-entrega/nova-entrega.component';
import { ListaEntregasComponent } from './lista-entregas/lista-entregas.component';
import { HomeComponent } from './components/template/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { ServiceWorkerModule } from '@angular/service-worker'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UnidadePipe } from './lista-entregas/UnidadePipe';
import { CpfFormatPipe } from './lista-entregas/CpfFormatPipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NovaEntregaComponent,
    ListaEntregasComponent,
    UnidadePipe,
    CpfFormatPipe,
    HomeComponent,
    ListaEntregasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [provideNgxMask(), {provide : LocationStrategy , useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
