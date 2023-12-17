import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, catchError, map, throwError } from "rxjs";
import { Entrega } from "../model/entrega";

@Injectable({
  providedIn: 'root'
})

export class JsonService{

  private apiUrl = 'http://localhost:3000/entregas';

  private entregasSubject: BehaviorSubject<Entrega[]> = new BehaviorSubject<Entrega[]>([]);
  public entregas$: Observable<Entrega[]> = this.entregasSubject.asObservable();
  private alteracoesJsonSubject: Subject<void> = new Subject<void>();
  public alteracoesJson$: Observable<void> = this.alteracoesJsonSubject.asObservable();
  private entregaEditSubject = new BehaviorSubject<any>(null);
  entregaEdit$ = this.entregaEditSubject.asObservable();

  constructor(private http: HttpClient) { }

  setEntregaEdit(entrega: any): void {
    this.entregaEditSubject.next(entrega);
  }

  getAllEntregas(): Observable<Entrega[]> {
    return this.http.get<Entrega[]>('http://localhost:3000/entregas').pipe(
      catchError((error) => {
        console.error('Erro ao recuperar entregas: ', error);
        return throwError('Erro ao recuperar entregas.');
      })
    );
  }

  obterEntregaPorId(entregaId: number): Observable<any> {
    const url = `${this.apiUrl}/${entregaId}`;
    console.log('url ' + url);
    return this.http.get<any>(url);
  }

  delete(entrega: Entrega):  Observable<void>{
    console.log('ID to delete: ' + entrega.id);
    const deleteObservable = this.http.delete<void>(`http://localhost:3000/entregas/${entrega.id}`).pipe(
      catchError((error) => {
        console.error('Erro ao excluir entrega: ', error);
        return throwError('Erro ao excluir o entrega.');
      }),
      map(() => {
        this.atualizarEntregasJson();
        this.alteracoesJsonSubject.next();
      })
    );
    return deleteObservable;
  }

  atualizarEntregasJson(): void {
    this.http.get<Entrega[]>('http://localhost:3000/entregas').subscribe(
      (entregas) => {
        this.entregasSubject.next(entregas);
      },
      (error) => console.error('Erro ao atualizar entregas: ', error)
    );
  }

  atualizarEntrega(entregaId: number, dadosAtualizados: any): Observable<any> {
    const url = `${this.apiUrl}/${entregaId}`;
    console.log('url: ' + url);
    console.log('dadosAtualizados' + JSON.stringify(dadosAtualizados));
    return this.http.put(url, dadosAtualizados)
      .pipe(
        map((resposta: any) => resposta),
        catchError((error) => {
          console.error('Erro ao atualizar entrega:', error);
          return throwError('Erro ao atualizar entrega');
        })
      );
  }

  salvarEntregaJson(entrega : any): Observable<any> {
    /*
    console.log('SAVE JSON: ' + JSON.stringify(entrega));

    // Adiciona logs para verificar as entregas antes do salvamento
    this.getAllEntregas().forEach((element) => {
      console.log('FROM JSON: ' + JSON.stringify(element));
    });
    const total = this.getAllEntregas();
    console.log('typeof total' + JSON.stringify(total));
    */

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`http://localhost:3000/entregas`, entrega, { headers });
  }
}
