export class Entrega {
    id?: number;

    constructor(
      public nome: string,
      public endereco: string,
      public cpf: string,
      public telefone: string,
      public produto: string,
      public quantidade: number,
      public observacao: string,
      public entregue: boolean){
        this.nome = nome;
        this.endereco = endereco;
        this.cpf = cpf;
        this.telefone = telefone;
        this.produto = produto;
        this.quantidade = quantidade;
        this.observacao = observacao;
        this.entregue = entregue;
    }
}
