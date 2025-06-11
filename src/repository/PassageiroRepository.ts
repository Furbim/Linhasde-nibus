import { Passageiro } from '../models/Passageiro';

import * as fs from 'fs';
import * as path from 'path';
import { isSet } from 'util/types';
import { Linha } from '../models/Linha';

export class PassageiroRepository {
    private passageiros: Passageiro[] = [];
    private passageirosFilePath: string = path.resolve(__dirname, '../database/passageiros.json');

    getAll(): Passageiro[] {
        if (!fs.existsSync(this.passageirosFilePath)) {
            fs.writeFileSync(this.passageirosFilePath, JSON.stringify([]));
        }
        this.passageiros = JSON.parse(fs.readFileSync(this.passageirosFilePath).toString());
        return this.passageiros;
    }

    getById(id: number): Passageiro | undefined {
        this.passageiros = this.getAll();
        if (!isSet(this.passageiros)) {
            return undefined;
        }
        return this.passageiros.find(passageiro => passageiro.id == id)
    }

    save() {
        fs.writeFileSync(this.passageirosFilePath, JSON.stringify(this.passageiros));
    }

    removerPassageiro(id: number) {
        this.passageiros = this.getAll();
        if (this.getById(id) == undefined) {
            console.log("Este passageiro não exite!")
        } else {
            this.passageiros.splice(this.passageiros.findIndex(passageiro => passageiro.id == id), 1);
            this.save()
        }
    }

    addPassageiro(passageiro: Passageiro) {
        this.passageiros = this.getAll();
        if (this.getById(passageiro.id) != undefined) {
            console.log("Este passageiro já exite!")
        } else {
            this.passageiros.push(passageiro);
            this.save()
        }

    }

    atualizarPassageiro(passageiro: Passageiro) {
        this.passageiros = this.getAll();
        if (this.getById(passageiro.id) == undefined) {
            console.log("Este passageiro não exite!")
        } else {
            this.passageiros.splice(this.passageiros.findIndex(passageiro => passageiro.id == passageiro.id), 1, passageiro);
            this.save()
        }
    }

}
