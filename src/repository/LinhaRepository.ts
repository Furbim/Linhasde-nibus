import { Linha } from '../models/Linha';
import * as fs from 'fs';
import * as path from 'path';
import { isSet } from 'util/types';
import { PassageiroRepository } from './PassageiroRepository';
import { Passageiro } from '../models/Passageiro';
import { get } from 'http';

export class LinhaRepository {
    private linhas: Linha[] = [];
    private linhasFilePath: string = path.resolve(__dirname, '../database/linhas.json');

    getAll(): Linha[] {
        if (!fs.existsSync(this.linhasFilePath)) {
            fs.writeFileSync(this.linhasFilePath, JSON.stringify([]));
        }
        this.linhas = JSON.parse(fs.readFileSync(this.linhasFilePath).toString());
        return this.linhas
    }

    getById(numero: number): Linha | undefined {
        this.linhas = this.getAll();
        if (this.linhas.length == 0) {
            return undefined;
        }else if(this.linhas.find(linhas => linhas.getNumero() == numero) == undefined){
            return undefined;
        }else{
            return this.linhas.find(linhas => linhas.getNumero() == numero); 
        }
    }

    save() {
        fs.writeFileSync(this.linhasFilePath, JSON.stringify(this.linhas));
    }

    removerLinha(numero: number) {
        let passageiros: Passageiro[] = []; 
        let pr: PassageiroRepository = new PassageiroRepository();
        this.linhas = this.getAll();
        if (this.getById(numero) == undefined) {
            console.log("Esta linha não existe!")
            return false
        } else {
            passageiros = pr.getAll();
            passageiros.forEach(p => {
                if(p.getLinha().getNumero() == numero){
                    pr.removerPassageiro(p.getId());
                }
            });
            this.linhas.splice(this.linhas.findIndex(linhas => linhas.getNumero() == numero));
            this.save()
        }
    }

    addLinha(linha: Linha): boolean{
        this.linhas = this.getAll();
        if (this.getById(linha.getNumero()) != undefined) {
            console.log("Esta linha já existe!")
            return false
        } else {
            this.linhas.push(linha);
            this.save();
            return true;
        }
    }

    atualizarLinha(linha: Linha){
        this.linhas = this.getAll();
        if (this.getById(linha.getNumero()) == undefined) {
            console.log("Esta linha não existe!")
            return false
        } else {
            this.linhas.splice(this.linhas.findIndex(linhas => linhas.getNumero() == linha.getNumero()), 1, linha);
            this.save();
        }
    }

    situaçãoLinha(numero: number){
        let passageiros: Passageiro[] = []; 
        let pr: PassageiroRepository = new PassageiroRepository();
        let linha: Linha | undefined = this.getById(numero);
        if(linha != undefined){
            let quantidadePassageiros = 0;
            passageiros = pr.getAll();
            passageiros.forEach(p => {
                if(p.getLinha().getNumero() == numero){
                    quantidadePassageiros++;
                }
            });

            if(linha.getCapacidade() > quantidadePassageiros){
                console.log(`A linha ${linha.getNumero()} está atendendo a demanda de ${quantidadePassageiros} passageiros, e tem capacidade para atender mais ${(linha.getCapacidade()-quantidadePassageiros)}.`)
                return true
            }else{
                console.log(`A linha ${linha.getNumero()} está atendendo a capacidade máxima de ${quantidadePassageiros} passageiros.`)
                return false
            }
        }
    }
    
}