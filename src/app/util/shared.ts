import { Entrega } from "../model/entrega";


export class Shared {

  constructor() {}

  entregas!: Entrega[];


  static getEntrega(): Entrega {
    return JSON.parse(localStorage.getItem('entrega')!);
  }

  public static initializeWebStorage(): void {
    if(localStorage.getItem('entrega') != null){
      return;
    }

    const entrega = {
    cpf: '000.222.333.85',
    endereco: 'Rua Bino, 245',
    nome: 'José',
    telefone: '(41)99998-8999',
    produto: 'Violeta',
    quantidade: 2,
    observacao: 'teste',
    entregue: false
    };

    localStorage.setItem("entrega", JSON.stringify(entrega));
  }

  public getEntrega() : Entrega {
    return JSON.parse(localStorage.getItem('entrega')!);
  }

}

