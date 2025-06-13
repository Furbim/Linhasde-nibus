export class Linha{
    private numero: number;
    private capacidade: number;
    private locais: String[] = [];
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

}

export enum Tipo{
    Publico,
    Executivo
}

//Trjeto precisa de pontos
//Criação 