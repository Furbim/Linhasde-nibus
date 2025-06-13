export class Pontos{
    private id: number;
    private latitude: number;
    private longitude: number;
    private rua: string;
    private bairro: string;
    private cidade: string;

    getId(): number{
        return this.id;
    }

    getLatitude(): number{
        return this.latitude;
    }

    getLongitude(): number{
        return this.longitude;
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


    constructor(id: number, latitude: number, longitude: number, rua: string, bairro: string, cidade: string){
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.rua = rua;
        this.bairro = bairro;
        this.cidade = cidade;
    }
}