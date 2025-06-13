import { Passageiro } from '../models/Passageiro';

import * as fs from 'fs';
import * as path from 'path';
import { isSet } from 'util/types';
import { Linha } from '../models/Linha';
import { LinhaRepository } from './LinhaRepository';

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
        if (this.passageiros.length == 0) {
            return undefined;
        }else if(this.passageiros.find(passageiro => passageiro.getId() == id) == undefined){
            return undefined;
        }else{
            return this.passageiros.find(passageiro => passageiro.getId() == id)
        }
        
    }

    save() {
        fs.writeFileSync(this.passageirosFilePath, JSON.stringify(this.passageiros));
    }

    removerPassageiro(id: number) {
        this.passageiros = this.getAll();
        if (this.getById(id) == undefined) {
            console.log("Este passageiro não exite!")
            return false
        } else {
            this.passageiros.splice(this.passageiros.findIndex(passageiro => passageiro.getId() == id), 1);
            this.save()
        }
    }

    addPassageiro(passageiro: Passageiro) {
        let linhas: Linha[] = [];
        let lr: LinhaRepository = new LinhaRepository();
        this.passageiros = this.getAll();
        if (this.getById(passageiro.getId()) != undefined) {
            console.log("Este passageiro já exite!")
        } else {
            if(lr.getById(passageiro.getLinha().getNumero()) != undefined){
                if(lr.situaçãoLinha(passageiro.getLinha().getNumero())){
                    this.passageiros.push(passageiro);
                    this.save()
                }else{
                    return false
                }
            }else{
                console.log("Esta linha não existe");
            }
        }
    }

    atualizarPassageiro(passageiro: Passageiro) {
        this.passageiros = this.getAll();
        if (this.getById(passageiro.getId()) == undefined) {
            console.log("Este passageiro não exite!")
            return false
        } else {
            this.passageiros.splice(this.passageiros.findIndex(passageiro => passageiro.getId() == passageiro.getId()), 1, passageiro);
            this.save()
        }
    }

}
