export class Linha{
    numero: number;
    capacidade: number;
    locais: String[] = [];

    constructor(numero: number, capacidade: number){
        this.numero = numero;
        this.capacidade = capacidade;
    }

}