import { Linha } from '../models/Linha';
import * as fs from 'fs';
import * as path from 'path';
import { isSet } from 'util/types';

export class LinhaRepository {
    private linhas: Linha[] = [];
    private linhasFilePath: string = path.resolve(__dirname, '..database/linhas.json');

    getAll(): Linha[] {
        if (!fs.existsSync(this.linhasFilePath)) {
            fs.writeFileSync(this.linhasFilePath, JSON.stringify([]));
        }
        this.linhas = JSON.parse(fs.readFileSync(this.linhasFilePath).toString());
        return this.linhas
    }

    getById(numero: number): Linha | undefined {
        this.linhas = this.getAll();
        if (!isSet(this.linhas)) {
            return undefined;
        }
        return this.linhas.find(linhas => linhas.numero == numero);
    }

    save() {
        fs.writeFileSync(this.linhasFilePath, JSON.stringify(this.linhas));
    }

    removerLinha(numero: number) {
        this.linhas = this.getAll();
        if (this.getById(numero) == undefined) {
            console.log("Esta linha não existe!")
        } else {
            this.linhas.splice(this.linhas.findIndex(linhas => linhas.numero == numero));
            this.save()
        }
    }

    addLinha(linha: Linha) {
        this.linhas = this.getAll();
        if (this.getById(linha.numero) != undefined) {
            console.log("Esta linha já existe!")
        } else {
            this.linhas.push(linha);
            this.save();
        }
    }

    atualizarLinha(linha: Linha){
        this.linhas = this.getAll();
        if (this.getById(linha.numero) == undefined) {
            console.log("Esta linha não existe!")
        } else {
            this.linhas.splice(this.linhas.findIndex(linhas => linhas.numero == linha.numero), 1, linha);
            this.save();
        }
    }
}