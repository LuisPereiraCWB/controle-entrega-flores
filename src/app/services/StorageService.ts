import { Injectable } from "@angular/core";
import { Entrega } from "../model/entrega";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class StorageService{

  entregas!: Entrega[];
  private entregasSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public entregas$: Observable<any[]> = this.entregasSubject.asObservable();

  salvarEntrega(entrega : any): void{
    console.log('***salvar***: ' + entrega);
    const allEntregas = this.getAllEntregas();
    allEntregas.push(entrega);
    localStorage.setItem('entregas', JSON.stringify(allEntregas));
    this.entregasSubject.next(allEntregas);
  }

  getEntregas() : Entrega[] {
    this.entregas = JSON.parse(localStorage.getItem('id')!);
    return this.entregas;
  }

  getAllEntregas() : any[] {
    const dataString = localStorage.getItem('entregas');
    //console.log('***allEntregas***: ' + dataString);
    const data = dataString ? JSON.parse(dataString) : [];
    //console.log('***allEntregas***: ' + data);
    this.entregasSubject.next(data);
    return data;
  }

  deleteEntrega(id: number): void {

    const entregasLocalStorage = this.getAllEntregas();
    entregasLocalStorage.splice(id, 1);
    this.updateLocalStorage(entregasLocalStorage);
    const mensagem = 'Exclusão local storage concluída com sucesso!';
    //alert(mensagem);

  }

  updateLocalStorage(data: any[]): void {
    localStorage.setItem('entregas', JSON.stringify(data));
    this.entregasSubject.next(data);
  }

  private atualizarEntregasLocalStorage(): void {
    const entregas = this.getAllEntregas();
    this.entregasSubject.next(entregas);
  }
}
