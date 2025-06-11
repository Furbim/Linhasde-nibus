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

    getById(id: number): Passageiro | undefined{
        this.passageiros = this.getAll();
        return this.passageiros.find(passageiro => passageiro.id == id)
    }

    removerPassageiro(id: number){
        this.passageiros.splice(this.getById(1))
    }

}
