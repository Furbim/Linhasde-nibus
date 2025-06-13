export class Pontos{
    private id: number;
    private rua: string;
    private bairro: string;
    private cidade: string;

    getId(): number{
        return this.id;
    }

    getRua(): string{
        return this.rua;
    }

    getBairro(): string{
        return this.bairro;
    }

    getCidade(): string{
        return this.cidade;
    }


    constructor(id: number, rua: string, bairro: string, cidade: string){
        this.id = id;
        this.rua = rua;
        this.bairro = bairro;
        this.cidade = cidade;
    }
}