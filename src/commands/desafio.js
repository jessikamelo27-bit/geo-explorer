import { buscarTrilha, listarIds } from "../utils/loader.js";

/** Banco de desafios por nível, indexados pela tecnologia */
const desafios = {
  javascript: {
    iniciante: {
      enunciado: "Crie uma função chamada `somaArray` que recebe um array de números e retorna a soma de todos os elementos.",
      exemplo_entrada: "[1, 2, 3, 4, 5]",
      exemplo_saida: "15",
      dica: "Use o método Array.reduce() ou um loop for.",
      template: `function somaArray(numeros) {\n  // Seu código aqui\n}\n\n// Teste\nconsole.log(somaArray([1, 2, 3, 4, 5])); // 15`,
    },
    intermediario: {
      enunciado: "Implemente uma função `buscarUsuario(id)` que simula uma busca assíncrona. Deve retornar uma Promise que resolve com um objeto de usuário após 500ms, ou rejeita com 'Usuário não encontrado' se o id for inválido (≤ 0).",
      exemplo_entrada: "buscarUsuario(1)",
      exemplo_saida: "{ id: 1, nome: 'Usuário 1', email: 'usuario1@email.com' }",
      dica: "Use `new Promise()`, `setTimeout` e verifique a validade do id antes de resolver.",
      template: `function buscarUsuario(id) {\n  return new Promise((resolve, reject) => {\n    // Seu código aqui\n  });\n}\n\n// Teste\nbuscarUsuario(1).then(console.log).catch(console.error);`,
    },
    avancado: {
      enunciado: "Implemente um `EventEmitter` simples com os métodos `on(evento, handler)`, `off(evento, handler)` e `emit(evento, ...args)`. Deve suportar múltiplos handlers por evento.",
      exemplo_entrada: `emitter.on('dados', (x) => console.log(x))\nemitter.emit('dados', 42)`,
      exemplo_saida: "42",
      dica: "Use um Map ou objeto para armazenar os handlers. Lembre-se de filtrar o handler correto no `off`.",
      template: `class EventEmitter {\n  constructor() {\n    // Seu código aqui\n  }\n\n  on(evento, handler) {}\n  off(evento, handler) {}\n  emit(evento, ...args) {}\n}`,
    },
  },
  python: {
    iniciante: {
      enunciado: "Crie uma função `contar_vogais(texto)` que recebe uma string e retorna o número de vogais (a, e, i, o, u), ignorando maiúsculas/minúsculas.",
      exemplo_entrada: '"Hello World"',
      exemplo_saida: "3",
      dica: "Use um loop e verifique se cada caractere está na string 'aeiou'.",
      template: `def contar_vogais(texto):\n    # Seu código aqui\n    pass\n\n# Teste\nprint(contar_vogais("Hello World"))  # 3`,
    },
    intermediario: {
      enunciado: "Implemente uma classe `Pilha` com os métodos `push(item)`, `pop()`, `peek()` (retorna o topo sem remover) e `esta_vazia()`. Levante `IndexError` se `pop()` ou `peek()` forem chamados em pilha vazia.",
      exemplo_entrada: `p = Pilha()\np.push(10)\np.push(20)\nprint(p.pop())`,
      exemplo_saida: "20",
      dica: "Use uma lista interna para armazenar os elementos.",
      template: `class Pilha:\n    def __init__(self):\n        # Seu código aqui\n        pass\n\n    def push(self, item):\n        pass\n\n    def pop(self):\n        pass\n\n    def peek(self):\n        pass\n\n    def esta_vazia(self):\n        pass`,
    },
    avancado: {
      enunciado: "Crie um decorator `cache_resultado` que memoriza o resultado de funções puras. A cada chamada com os mesmos argumentos, deve retornar o valor em cache em vez de recalcular.",
      exemplo_entrada: "@cache_resultado\ndef fib(n): return n if n <= 1 else fib(n-1) + fib(n-2)",
      exemplo_saida: "fib(10) → 55 (calculado apenas uma vez por valor de n)",
      dica: "Use um dicionário para armazenar pares (args) → resultado. `functools.wraps` mantém a assinatura original.",
      template: `import functools\n\ndef cache_resultado(func):\n    # Seu código aqui\n    pass\n\n@cache_resultado\ndef fib(n):\n    return n if n <= 1 else fib(n - 1) + fib(n - 2)\n\nprint(fib(10))  # 55`,
    },
  },
  react: {
    iniciante: {
      enunciado: "Crie um componente `Contador` que exibe um número e dois botões: '+' (incrementa) e '-' (decrementa). O valor não deve ficar abaixo de 0.",
      exemplo_entrada: "<Contador />",
      exemplo_saida: "Componente funcional com estado e dois botões funcionais",
      dica: "Use o hook useState. Adicione uma condição para evitar valores negativos.",
      template: `import { useState } from 'react';\n\nexport function Contador() {\n  // Seu código aqui\n}\n`,
    },
    intermediario: {
      enunciado: "Crie um hook customizado `useFetch(url)` que retorna `{ dados, carregando, erro }`. Deve buscar os dados quando a URL mudar e cancelar a requisição se o componente desmontar.",
      exemplo_entrada: "const { dados, carregando } = useFetch('https://api.example.com/items')",
      exemplo_saida: "Hook que gerencia estado de loading, dados e erro",
      dica: "Use useEffect com uma AbortController para cancelar o fetch. Trate os estados separadamente.",
      template: `import { useState, useEffect } from 'react';\n\nexport function useFetch(url) {\n  // Seu código aqui\n}\n`,
    },
    avancado: {
      enunciado: "Implemente um componente `VirtualList` que renderiza apenas os itens visíveis em uma lista longa (virtualização). Dado um array de 10.000 itens, deve renderizar somente os que estão na viewport.",
      exemplo_entrada: "<VirtualList itens={arrayDe10000} alturaItem={40} alturaContainer={400} />",
      exemplo_saida: "Apenas ~10 elementos no DOM por vez",
      dica: "Calcule startIndex e endIndex com base no scrollTop. Use um div espaçador para simular a altura total.",
      template: `import { useState, useRef } from 'react';\n\nexport function VirtualList({ itens, alturaItem, alturaContainer }) {\n  // Seu código aqui\n}\n`,
    },
  },
  node: {
    iniciante: {
      enunciado: "Crie um servidor HTTP com o módulo nativo `http` que responde à rota GET /ping com `{ status: 'ok', timestamp: <data_atual> }` em JSON.",
      exemplo_entrada: "GET http://localhost:3000/ping",
      exemplo_saida: '{ "status": "ok", "timestamp": "2024-01-15T10:30:00.000Z" }',
      dica: "Use `http.createServer`, defina o header `Content-Type: application/json` e use `res.end(JSON.stringify(...))`.",
      template: `import http from 'http';\n\nconst server = http.createServer((req, res) => {\n  // Seu código aqui\n});\n\nserver.listen(3000, () => console.log('Servidor em http://localhost:3000'));`,
    },
    intermediario: {
      enunciado: "Crie um middleware Express de autenticação JWT. Deve validar o token no header Authorization (formato 'Bearer <token>'), retornar 401 se ausente e 403 se inválido/expirado.",
      exemplo_entrada: "Authorization: Bearer eyJhbGci...",
      exemplo_saida: "Middleware que valida o token e injeta req.usuario ou retorna erro HTTP",
      dica: "Use a biblioteca `jsonwebtoken`. Trate os erros `JsonWebTokenError` e `TokenExpiredError` separadamente.",
      template: `import jwt from 'jsonwebtoken';\n\nexport function autenticarJWT(req, res, next) {\n  // Seu código aqui\n}\n`,
    },
    avancado: {
      enunciado: "Implemente um sistema de filas em memória com as classes `Fila` (add, process) e `Trabalhador` (processa jobs com retry automático). Cada job deve ter no máximo 3 tentativas antes de ir para a Dead Letter Queue.",
      exemplo_entrada: "fila.add({ tarefa: 'enviarEmail', dados: {...} })",
      exemplo_saida: "Job processado ou movido para DLQ após 3 falhas",
      dica: "Use EventEmitter. Mantenha um contador de tentativas por job. A DLQ é outra fila para inspeção posterior.",
      template: `import { EventEmitter } from 'events';\n\nexport class Fila extends EventEmitter {\n  // Seu código aqui\n}\n\nexport class Trabalhador {\n  // Seu código aqui\n}\n`,
    },
  },
  typescript: {
    iniciante: {
      enunciado: "Crie uma interface `Produto` com os campos `id` (number), `nome` (string), `preco` (number) e `categoria` (string opcional). Depois, crie uma função `formatarPreco(produto: Produto): string` que retorna o nome e preço formatado.",
      exemplo_entrada: "formatarPreco({ id: 1, nome: 'Notebook', preco: 4500 })",
      exemplo_saida: '"Notebook — R$ 4.500,00"',
      dica: "Use `Intl.NumberFormat` para formatar o preço em BRL.",
      template: `interface Produto {\n  // Seu código aqui\n}\n\nfunction formatarPreco(produto: Produto): string {\n  // Seu código aqui\n}\n`,
    },
    intermediario: {
      enunciado: "Crie um tipo genérico `Resultado<T>` que pode ser `{ sucesso: true; dados: T }` ou `{ sucesso: false; erro: string }`. Implemente uma função `dividir(a: number, b: number): Resultado<number>` que usa esse tipo.",
      exemplo_entrada: "dividir(10, 2) / dividir(10, 0)",
      exemplo_saida: "{ sucesso: true, dados: 5 } / { sucesso: false, erro: 'Divisão por zero' }",
      dica: "Use discriminated unions. O TypeScript vai inferir o tipo correto em cada branch.",
      template: `type Resultado<T> =\n  // Seu código aqui\n\nfunction dividir(a: number, b: number): Resultado<number> {\n  // Seu código aqui\n}\n`,
    },
    avancado: {
      enunciado: "Implemente um tipo utilitário `DeepReadonly<T>` que torna todas as propriedades de um objeto recursivamente readonly, incluindo objetos aninhados e arrays.",
      exemplo_entrada: "type Config = DeepReadonly<{ db: { host: string; porta: number } }>",
      exemplo_saida: "Todas as propriedades, em qualquer profundidade, são readonly",
      dica: "Use conditional types e mapped types. Verifique se a propriedade é um objeto antes de aplicar recursivamente.",
      template: `type DeepReadonly<T> =\n  // Seu código aqui\n\n// Teste\ntype Config = DeepReadonly<{\n  db: { host: string; porta: number };\n  features: string[];\n}>;\n`,
    },
  },
};

/**
 * Gera um desafio de código para a tecnologia e nível informados.
 * @param {string} tecnologia
 * @param {string} [nivel="iniciante"]
 * @returns {string}
 */
export function desafio(tecnologia, nivel = "iniciante") {
  if (!tecnologia) {
    const disponiveis = Object.keys(desafios).join(", ");
    return `❌ Informe uma tecnologia.\n\nTecnologias disponíveis: ${disponiveis}`;
  }

  const techLower = tecnologia.toLowerCase();
  if (!desafios[techLower]) {
    const disponiveis = Object.keys(desafios).join(", ");
    return `❌ Tecnologia "${tecnologia}" não encontrada.\n\nTecnologias disponíveis: ${disponiveis}`;
  }

  const niveisValidos = ["iniciante", "intermediario", "avancado"];
  if (!niveisValidos.includes(nivel)) {
    return `❌ Nível "${nivel}" inválido.\n\nNíveis válidos: ${niveisValidos.join(", ")}`;
  }

  const d = desafios[techLower][nivel];
  const id = `${techLower}-${nivel}-${Date.now()}`;

  const linhas = [
    `╔══════════════════════════════════════════╗`,
    `║      💻  GEO-EXPLORER — DESAFIO          ║`,
    `╚══════════════════════════════════════════╝`,
    ``,
    `🆔 ID do Desafio: ${id}`,
    `🔧 Tecnologia: ${tecnologia}`,
    `🎯 Nível: ${nivel.charAt(0).toUpperCase() + nivel.slice(1)}`,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `📋 Enunciado`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `${d.enunciado}`,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `📥 Exemplo de Entrada`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `${d.exemplo_entrada}`,
    ``,
    `📤 Saída Esperada`,
    ``,
    `${d.exemplo_saida}`,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `🚀 Template Inicial`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `${d.template}`,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `💡 Dica: ${d.dica}`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `Após concluir, gere seu certificado:`,
    `  geo-explorer certificado "${tecnologia}" "Seu Nome"`,
  ];

  return linhas.join("\n");
}
