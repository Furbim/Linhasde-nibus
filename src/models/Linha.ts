export class Linha{
    numero: number;
    capacidade: number;
    locais: String[] = [];
    tipo: Tipo;
    

    constructor(numero: number, capacidade: number, tipo: Tipo){
        this.numero = numero;
        this.capacidade = capacidade;
        this.tipo = tipo;
    }

}

export enum Tipo{
    Publico,
    Executivo
}

//Trjeto precisa de pontos
//Criação 