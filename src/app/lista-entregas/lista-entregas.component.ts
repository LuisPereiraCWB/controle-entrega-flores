import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/services/StorageService';
import { JsonService } from './../services/jsonService';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Entrega } from '../model/entrega';
import { Shared } from '../util/shared';
import { EntregaData } from '../model/entregaData';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-entregas',
  templateUrl: './lista-entregas.component.html',
  styleUrls: ['./lista-entregas.component.css']
})
export class ListaEntregasComponent implements OnInit{

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  @Input() entregaDatasInput!: EntregaData;

  p: number = 1;
  itemsPerPage: number = 5;

  //entrega!: Entrega;
  entregas: Entrega[] = [];
  entregas$!: Observable<Entrega[]>;
  private entregasSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  dadosPaginate = new MatTableDataSource<any>(this.entregas);

  constructor(private jsonService : JsonService,
              public storageService : StorageService,
              public http : HttpClient,
              private router: Router
              ){}

  async onButtonClick() {

  }

  ngOnInit(): void {
    this.dadosPaginate.paginator = this.paginator;
    this.entregas$ = this.jsonService.getAllEntregas();
    console.log('this.entregas$: ' + this.entregas$);

    // Recuperando os objetos do localStorage
    const chavesLocalStorage = Object.keys(localStorage);

      const objetosRecuperadosJson = this.jsonService.getAllEntregas();
      console.log('JSONservice ' + objetosRecuperadosJson);

      const objetosRecuperados: Entrega[] = chavesLocalStorage
      .filter(chave => chave.startsWith('entregas'))
      .map(chave => {
        const objetoStringRecuperado: string | null = localStorage.getItem(chave);
        if (objetoStringRecuperado) {
          //console.log('objetoStringRecuperado' + objetoStringRecuperado);
          return JSON.parse(objetoStringRecuperado) as Entrega;
        } else {
          return null;
        }
      })
      .filter(objeto => objeto !== null) as Entrega[];

    this.entregas = this.storageService.getAllEntregas();
  }

  changeItemsPerPage(event: PageEvent): void {
    this.itemsPerPage = event.pageSize;
    this.p = event.pageIndex + 1;
    this.carregarDados();
  }

  private carregarDados(): void {
    this.jsonService.getAllEntregas().subscribe(
      (entregas) => {
        this.dadosPaginate.data = entregas;
      },
      (error) => {
        console.error('Erro ao carregar dados:', error);
      }
    );
  }

  onDeleteJsonServerButtonClick(index: number){
    console.log('delete: ' + index);
    //entregaSelecionada: Entrega;

    this.entregas$.pipe(
      map(itens => itens[index]),
    ).subscribe(itemEncontrado => {
      if (itemEncontrado) {
        console.log('Index do item desejado:', itemEncontrado.id);

        this.jsonService.delete(itemEncontrado).subscribe(
          () => {
            console.log('Exclusão concluída');
          },
          (error) => {
            console.error('Erro ao excluir o entrega:', error);
          });

      } else {
        console.log('Item não encontrado com o index selecionado.');
      }
    });
    this.entregas$ = this.jsonService.getAllEntregas();
    alert('Entrega apagada');

  }

  onEditButtonClick(entrega: any) {
    console.log('editar : ' + JSON.stringify(entrega));
    this.jsonService.setEntregaEdit(entrega);
    this.router.navigate(['/edicao', entrega.id]);
  }

  onDeleteLocalStorageButtonClick(id: number){
    console.log('delete: ' + id);
    this.storageService.deleteEntrega(id);
    this.entregas = this.storageService.getAllEntregas();
    alert('Entrega apagada');
  }

  formatarTelefone(telefone: string): string {
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
}
