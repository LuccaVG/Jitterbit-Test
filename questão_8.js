function somaimpares(n) {
    let soma = 0;
    for (let i = 1; i <= n; i += 2) {
        soma += i;
    }
    return soma;
}

const args = process.argv.slice(2);

if (args.length === 0) {
    console.log("Por favor, forneça um número inteiro positivo como argumento.");
    console.log("Exemplo: node index.js 10");
    process.exit(1);
}

const n = parseInt(args[0]);

if (isNaN(n) || n < 0) {
    console.log("Erro: O argumento deve ser um número inteiro positivo.");
    process.exit(1);
}

console.log(`A soma dos ímpares de 1 até ${n} é: ${somaimpares(n)}`);

// como rodar: node questão_8.js (numero)
// exemplo: node questão_8.js 10