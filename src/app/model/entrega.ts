export class Entrega {
    nome: string;
    endereco: string;
    cpf: string;
    telefone: string;
    produto: string;
    quantidade: number;
    observacao: string;
    entregue: boolean;

    construtor(nome, endereco, cpf, telefone, produto, quantidade, observacao, entregue){
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