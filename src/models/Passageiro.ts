import {Linha} from './Linha';

export class Passageiro{
    id: number;
    nome: String;
    linha: Linha;

    constructor(id: number, nome: String, linha: Linha){
        this.id = id;
        this.nome = nome;
        this.linha = linha;
    }

    trocarLinha(linha: Linha){
        this.linha = linha;
    }

    mostrarInfo(){
        console.log(`O passageiro ${this.nome}, frequenta a linha de número ${this.linha.numero}`);
    }
}