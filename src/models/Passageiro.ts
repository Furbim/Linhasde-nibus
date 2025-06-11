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
}