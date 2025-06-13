import { Pontos } from "./Pontos";

export class Linha{
    private numero: number;
    private capacidade: number;
    private locais: Pontos[] = [];
    tipo: Tipo;
    

    constructor(numero: number, capacidade: number, tipo: Tipo){
        this.numero = numero;
        this.capacidade = capacidade;
        this.tipo = tipo;
    }

    getNumero(){
        return this.numero;
    }
    getCapacidade(){
        return this.capacidade;
    }
    getLocais(){
        return this.locais;
    }
    getTipo(){
        return this.tipo;
    }
    adicionarPonto(numero: number, rua: string, bairro: string, cidade: string){
        let id: number = this.locais.length;
        let ponto: Pontos = new Pontos( id, numero, rua, bairro, cidade);
        this.locais.push(ponto);
    }

}

export enum Tipo{
    Publico,
    Executivo
}

//Trjeto precisa de pontos
//Criação 