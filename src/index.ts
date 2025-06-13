import { getEnvironmentData } from 'worker_threads';
import { Linha, Tipo } from './models/Linha';
import { Passageiro } from './models/Passageiro';
import { LinhaRepository } from './repository/LinhaRepository';
import { PassageiroRepository } from './repository/PassageiroRepository';
import readlineSync from 'readline-sync';

const linhaRepository: LinhaRepository = new LinhaRepository();
var linha: Linha;

console.log("Iniciando o sistema de transporte público");

let opcao: number = 0;

while (opcao != 5) {
    console.log("1 - Adicionar uma nova linha");
    console.log("2 - Adicionar um novo passageiro");
    console.log("3 - Listar todas as linhas");
    console.log("4 - Listar todos os passageiros");
    console.log("5 - Sair");
    opcao = parseInt(readlineSync.question("Digite a opção desejada:"));
    
    switch (opcao) {
        case 1:
            do {

                console.log("Adicionar nova linha");
                let entrada;
                let numero: number;
                let capacidade: number;
                let tipo: Tipo = Tipo.Executivo;

                do {
                    entrada = readlineSync.question("Digite o número da linha:");
                    numero = parseInt(entrada);

                    if (isNaN(numero) || numero <= 0) {
                        console.log("Por favor, digite um número válido e maior que zero.");
                    }
                    if(linhaRepository.getById(numero) != undefined){
                        console.log("Este número já pertence a uma linha!")
                    }
                } while (isNaN(numero) || numero <= 0 || linhaRepository.getById(numero) != undefined);

                do {
                    entrada = readlineSync.question("Digite a capacidade da linha:");
                    capacidade = parseInt(entrada);

                    if(isNaN(capacidade) || capacidade <= 0){
                        console.log("Por favor, digite um valor válido e maior que zero.");
                    }

                } while (isNaN(capacidade) || capacidade <= 0);
                do {
                    entrada = parseInt(readlineSync.question("Digite o tipo de linha: (1-Executiva / 2-Publica)"));
 
                    switch (entrada) {
                        case 1:
                            tipo = Tipo.Executivo;
                            break;
                        case 2:
                            tipo = Tipo.Publico
                            break;
                        default:
                            console.log("Tipo de linha invalido!")
                            break;
                    }
                } while (entrada != 1 && entrada != 2);

                linha = new Linha(numero,capacidade,tipo);

            }while(linhaRepository.addLinha(linha));

            break;
        case 2:
            console.log("Adicionar um novo passageiro");
    }
}





linha = new Linha(30, 30, Tipo.Executivo);

linhaRepository.addLinha(linha);

let passageiro: Passageiro = new Passageiro(1, "Thiago", linha);

let passageiroRepository: PassageiroRepository = new PassageiroRepository();


console.log(passageiroRepository.getAll());

console.log(linhaRepository.getAll());


console.log(passageiroRepository.getById(1));



