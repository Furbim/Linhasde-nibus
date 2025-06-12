import {Linha,Tipo} from './models/Linha';

import {Passageiro} from './models/Passageiro';

import {PassageiroRepository} from './repository/PassageiroRepository';  



let linha: Linha = new Linha(303,30,Tipo.Executivo);

let passageiro: Passageiro = new Passageiro(1,"Thiago",linha);

let passageiroRepository: PassageiroRepository = new PassageiroRepository();


console.log(passageiroRepository.getAll());

console.log(passageiroRepository.getById(1));


