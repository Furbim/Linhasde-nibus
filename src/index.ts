import { getEnvironmentData } from 'worker_threads';
import { Linha, Tipo } from './models/Linha';
import { Pontos } from './models/Pontos';
import { Passageiro } from './models/Passageiro';
import { LinhaRepository } from './repository/LinhaRepository';
import { PassageiroRepository } from './repository/PassageiroRepository';
import readlineSync from 'readline-sync';

const linhaRepository: LinhaRepository = new LinhaRepository();
var linha: Linha;

console.log("Iniciando o sistema de transporte público");

let opcao: number = 0;

while (opcao != 6) {
    console.log("1 - Adicionar uma nova linha");
    console.log("2 - Adicionar um novo passageiro");
    console.log("3 - Listar todas as linhas");
    console.log("4 - Listar todos os passageiros");
    console.log("5 - Adicionar Pontos a uma linha");
    console.log("6 - Sair");
    opcao = parseInt(readlineSync.question("Digite a opção desejada:"));

    switch (opcao) {
        case 1:
            let entrada;
            let numero: number;
            let capacidade: number;
            let tipo: Tipo = Tipo.Executivo;
            do {
                console.log("Adicionar nova linha");
                do {
                    entrada = readlineSync.question("Digite o número da linha:");
                    numero = parseInt(entrada);

                    if (isNaN(numero) || numero <= 0) {
                        console.log("Por favor, digite um número válido e maior que zero.");
                    }
                    if (linhaRepository.getById(numero) != undefined) {
                        console.log("Este número já pertence a uma linha!")
                    }
                } while (isNaN(numero) || numero <= 0 || linhaRepository.getById(numero) != undefined);

                do {
                    entrada = readlineSync.question("Digite a capacidade da linha:");
                    capacidade = parseInt(entrada);

                    if (isNaN(capacidade) || capacidade <= 0) {
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

                linha = new Linha(numero, capacidade, tipo);

            } while (linhaRepository.addLinha(linha));

            console.log("Adicionar os pontos da linha");
            let quantidade: number;
            let cont: number = 0;
            let locais: Pontos[] = [];
            do {
                entrada = readlineSync.question("Digite a quantidade de pontos a serem adicionados:");
                quantidade = parseInt(entrada);

                if (isNaN(quantidade) || quantidade <= 0) {
                    console.log("Por favor, digite um valor válido e maior que zero.");
                }

            } while (isNaN(quantidade) || quantidade <= 0);

            while(cont <= quantidade){
            let numeroPonto: number;
            let rua: string;
            let bairro: string;
            let cidade: string; 

            do {
                entrada = readlineSync.question("Digite o número do ponto:");
                numeroPonto = parseInt(entrada);

                if (isNaN(numeroPonto) || numeroPonto <= 0) {
                    console.log("Por favor, digite um número válido e maior que zero.");
                }
            } while (isNaN(numeroPonto) || numeroPonto <= 0);

            rua = readlineSync.question("Digite a rua do ponto:");
            bairro = readlineSync.question("Digite o bairro do ponto:");
            cidade = readlineSync.question("Digite a cidade do ponto:");

            let ponto: Pontos = new Pontos(quantidade,numeroPonto,rua,bairro,cidade);
            locais.push(ponto);
                
            }

            locais.forEach(local => {
                linhaRepository.addPonto(numero, local.getNumero(), local.getRua(), local.getBairro(), local.getCidade());
            });
            console.log("Linha cadastrada com sucesso!");
            
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



