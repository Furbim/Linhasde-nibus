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
    adicionarPonto(id: number, rua: string, bairro: string, cidade: string){
        let ponto: Pontos = new Pontos(id,rua,bairro,cidade);
        this.locais.push(ponto);
    }

}

export enum Tipo{
    Publico,
    Executivo
}

//Trjeto precisa de pontos
//Criação 