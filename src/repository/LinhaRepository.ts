import { Linha } from '../models/Linha';
import * as fs from 'fs';
import * as path from 'path';
import { isSet } from 'util/types';
import { PassageiroRepository } from './PassageiroRepository';
import { Passageiro } from '../models/Passageiro';
import { get } from 'http';

export class LinhaRepository {
    private passageiros: Passageiro[] = []; 
    private pr: PassageiroRepository = new PassageiroRepository();
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
            return false
        } else {
            this.passageiros = this.pr.getAll();
            this.passageiros.forEach(p => {
                if(p.linha.numero == numero){
                    this.pr.removerPassageiro(p.id);
                }
            });
            this.linhas.splice(this.linhas.findIndex(linhas => linhas.numero == numero));
            this.save()
        }
    }

    addLinha(linha: Linha) {
        this.linhas = this.getAll();
        if (this.getById(linha.numero) != undefined) {
            console.log("Esta linha já existe!")
            return false
        } else {
            this.linhas.push(linha);
            this.save();
        }
    }

    atualizarLinha(linha: Linha){
        this.linhas = this.getAll();
        if (this.getById(linha.numero) == undefined) {
            console.log("Esta linha não existe!")
            return false
        } else {
            this.linhas.splice(this.linhas.findIndex(linhas => linhas.numero == linha.numero), 1, linha);
            this.save();
        }
    }

    situaçãoLinha(numero: number){
        let linha: Linha | undefined = this.getById(numero);
        if(linha != undefined){
            let quantidadePassageiros = 0;
            this.passageiros = this.pr.getAll();
            this.passageiros.forEach(p => {
                if(p.linha.numero == numero){
                    quantidadePassageiros++;
                }
            });

            if(linha.capacidade > quantidadePassageiros){
                console.log(`A linha ${linha.numero} está atendendo a demanda de ${quantidadePassageiros} passageiros, e tem capacidade para atender mais ${(linha.capacidade-quantidadePassageiros)}.`)
                return true
            }else{
                console.log(`A linha ${linha.numero} está atendendo a capacidade máxima de ${quantidadePassageiros} passageiros.`)
                return false
            }
        }
    }
    
}