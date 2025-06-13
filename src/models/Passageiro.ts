import {Linha} from './Linha';

export class Passageiro{
    private id: number;
    private nome: String;
    private linha: Linha;

    constructor(id: number, nome: String, linha: Linha){
        this.id = id;
        this.nome = nome;
        this.linha = linha;
    }

    getId(){
        return this.id;
    }
    getNome(){
        return this.nome;
    }
    getLinha(){
        return this.linha;
    }   
    
}