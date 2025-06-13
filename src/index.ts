import {Linha,Tipo} from './models/Linha';

import {Passageiro} from './models/Passageiro';
import { LinhaRepository } from './repository/LinhaRepository';

import {PassageiroRepository} from './repository/PassageiroRepository';  



let linha: Linha = new Linha(303,30,Tipo.Executivo);

let linhaRepository: LinhaRepository = new LinhaRepository();

linha = new Linha(30,30,Tipo.Executivo);

linhaRepository.addLinha(linha);

let passageiro: Passageiro = new Passageiro(1,"Thiago",linha);

let passageiroRepository: PassageiroRepository = new PassageiroRepository();


console.log(passageiroRepository.getAll());

console.log(linhaRepository.getAll());


console.log(passageiroRepository.getById(1));



