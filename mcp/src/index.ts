#!/usr/bin/env node
/**
 * Servidor MCP do Geo-Explorer
 *
 * Expõe três ferramentas para uso por agentes de IA:
 *   - geo_trilha: retorna plano de estudos por tecnologia e nível
 *   - geo_desafio: gera um desafio de código
 *   - geo_certificado: emite certificado fictício de conclusão
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ──────────────────────────────────────────────
// Carrega dados das trilhas do JSON
// ──────────────────────────────────────────────

interface Modulo {
  ordem: number;
  titulo: string;
  topicos: string[];
}

interface NivelTrilha {
  modulos: Modulo[];
}

interface Trilha {
  id: string;
  nome: string;
  descricao: string;
  duracao_horas: number;
  niveis: {
    iniciante: NivelTrilha;
    intermediario: NivelTrilha;
    avancado: NivelTrilha;
  };
}

function carregarTrilhas(): Trilha[] {
  // Caminho relativo ao repositório raiz
  const caminho = resolve(__dirname, "../../src/data/trilhas.json");
  const conteudo = readFileSync(caminho, "utf-8");
  return JSON.parse(conteudo).trilhas as Trilha[];
}

function buscarTrilha(id: string): Trilha | null {
  const trilhas = carregarTrilhas();
  return trilhas.find((t) => t.id === id.toLowerCase()) ?? null;
}

function listarIds(): string[] {
  return carregarTrilhas().map((t) => t.id);
}

// ──────────────────────────────────────────────
// Lógica reutilizada dos comandos (versão MCP)
// ──────────────────────────────────────────────

type Nivel = "iniciante" | "intermediario" | "avancado";
const NIVEIS_VALIDOS: Nivel[] = ["iniciante", "intermediario", "avancado"];

function gerarTrilha(tecnologia: string, nivel: Nivel): string {
  const dados = buscarTrilha(tecnologia);
  if (!dados) {
    return `Trilha "${tecnologia}" não encontrada. Disponíveis: ${listarIds().join(", ")}`;
  }

  const dadosNivel = dados.niveis[nivel];
  const linhas: string[] = [
    `📚 Trilha: ${dados.nome}`,
    `🎯 Nível: ${nivel}`,
    `⏱️  Duração: ${dados.duracao_horas} horas`,
    `📝 ${dados.descricao}`,
    ``,
    `Módulos:`,
  ];

  for (const modulo of dadosNivel.modulos) {
    linhas.push(`  ${modulo.ordem}. ${modulo.titulo}`);
    for (const topico of modulo.topicos) {
      linhas.push(`     • ${topico}`);
    }
  }

  return linhas.join("\n");
}

const desafiosData: Record<string, Record<Nivel, { enunciado: string; template: string; dica: string }>> = {
  javascript: {
    iniciante: {
      enunciado: "Crie uma função `somaArray(numeros)` que retorna a soma de todos os elementos de um array.",
      template: `function somaArray(numeros) {\n  // Seu código aqui\n}`,
      dica: "Use Array.reduce() ou um loop for.",
    },
    intermediario: {
      enunciado: "Implemente `buscarUsuario(id)` que retorna uma Promise com o usuário após 500ms, ou rejeita se id ≤ 0.",
      template: `function buscarUsuario(id) {\n  return new Promise((resolve, reject) => {\n    // Seu código aqui\n  });\n}`,
      dica: "Use setTimeout dentro da Promise.",
    },
    avancado: {
      enunciado: "Implemente um EventEmitter com os métodos on, off e emit. Suporte múltiplos handlers por evento.",
      template: `class EventEmitter {\n  on(evento, handler) {}\n  off(evento, handler) {}\n  emit(evento, ...args) {}\n}`,
      dica: "Use um Map para armazenar os handlers.",
    },
  },
  python: {
    iniciante: {
      enunciado: "Crie `contar_vogais(texto)` que retorna o número de vogais (ignora maiúsculas/minúsculas).",
      template: `def contar_vogais(texto):\n    pass`,
      dica: "Verifique se cada char está em 'aeiou'.",
    },
    intermediario: {
      enunciado: "Implemente a classe `Pilha` com push, pop, peek e esta_vazia. Levante IndexError em pilha vazia.",
      template: `class Pilha:\n    def __init__(self):\n        pass`,
      dica: "Use uma lista interna para armazenar os elementos.",
    },
    avancado: {
      enunciado: "Crie o decorator `cache_resultado` que memoriza resultados de funções puras.",
      template: `def cache_resultado(func):\n    pass`,
      dica: "Use um dicionário para armazenar pares args → resultado.",
    },
  },
  react: {
    iniciante: {
      enunciado: "Crie o componente `Contador` com dois botões (+/-) usando useState. O valor não deve ficar abaixo de 0.",
      template: `export function Contador() {\n  // useState aqui\n}`,
      dica: "Adicione condição para valores negativos.",
    },
    intermediario: {
      enunciado: "Crie o hook `useFetch(url)` que retorna { dados, carregando, erro }. Cancele com AbortController.",
      template: `export function useFetch(url) {\n  // useEffect aqui\n}`,
      dica: "Use AbortController no cleanup do useEffect.",
    },
    avancado: {
      enunciado: "Implemente VirtualList que renderiza apenas os itens visíveis de uma lista com 10.000 itens.",
      template: `export function VirtualList({ itens, alturaItem, alturaContainer }) {\n  // Seu código aqui\n}`,
      dica: "Calcule startIndex e endIndex com base no scrollTop.",
    },
  },
  node: {
    iniciante: {
      enunciado: "Crie um servidor HTTP nativo que responde GET /ping com { status: 'ok', timestamp }.",
      template: `import http from 'http';\nconst server = http.createServer((req, res) => {\n  // Seu código\n});`,
      dica: "Defina Content-Type: application/json.",
    },
    intermediario: {
      enunciado: "Crie middleware Express para autenticação JWT. Retorne 401 sem token e 403 com token inválido.",
      template: `export function autenticarJWT(req, res, next) {\n  // Seu código\n}`,
      dica: "Use a biblioteca jsonwebtoken.",
    },
    avancado: {
      enunciado: "Implemente um sistema de filas com retry automático e Dead Letter Queue após 3 falhas.",
      template: `export class Fila extends EventEmitter {\n  // Seu código\n}`,
      dica: "Use EventEmitter e mantenha contador de tentativas.",
    },
  },
  typescript: {
    iniciante: {
      enunciado: "Crie a interface Produto e a função formatarPreco que retorna nome e preço formatado em BRL.",
      template: `interface Produto { id: number; nome: string; preco: number; }\nfunction formatarPreco(p: Produto): string {}`,
      dica: "Use Intl.NumberFormat para BRL.",
    },
    intermediario: {
      enunciado: "Crie o tipo genérico Resultado<T> (sucesso/falha) e use-o em dividir(a, b).",
      template: `type Resultado<T> = { sucesso: true; dados: T } | { sucesso: false; erro: string };`,
      dica: "Use discriminated unions.",
    },
    avancado: {
      enunciado: "Implemente DeepReadonly<T> que torna todas as propriedades recursivamente readonly.",
      template: `type DeepReadonly<T> = // Seu código`,
      dica: "Use conditional types e mapped types.",
    },
  },
};

function gerarDesafio(tecnologia: string, nivel: Nivel): string {
  const tech = tecnologia.toLowerCase() as keyof typeof desafiosData;
  if (!desafiosData[tech]) {
    return `Tecnologia "${tecnologia}" não encontrada. Disponíveis: ${Object.keys(desafiosData).join(", ")}`;
  }

  const d = desafiosData[tech][nivel];
  return [
    `💻 Desafio — ${tecnologia} (${nivel})`,
    ``,
    `📋 Enunciado:`,
    d.enunciado,
    ``,
    `🚀 Template:`,
    d.template,
    ``,
    `💡 Dica: ${d.dica}`,
  ].join("\n");
}

function gerarCodigoCertificado(nome: string, tecnologia: string, nivel: string): string {
  const base = `${nome.toLowerCase().replace(/\s+/g, "")}${tecnologia}${nivel}${new Date().getFullYear()}`;
  let hash = 0;
  for (let i = 0; i < base.length; i++) {
    const char = base.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  const hashHex = Math.abs(hash).toString(16).toUpperCase().padStart(8, "0");
  return `GEO-${tecnologia.toUpperCase().slice(0, 2)}-${nivel.toUpperCase().slice(0, 3)}-${hashHex}`;
}

function gerarCertificado(tecnologia: string, nome: string, nivel: Nivel): string {
  const dados = buscarTrilha(tecnologia);
  if (!dados) {
    return `Trilha "${tecnologia}" não encontrada. Disponíveis: ${listarIds().join(", ")}`;
  }

  const dataEmissao = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const codigo = gerarCodigoCertificado(nome, tecnologia, nivel);

  return [
    `🌍 GEO-EXPLORER ACADEMY — CERTIFICADO DE CONCLUSÃO`,
    ``,
    `Certificamos que ${nome.toUpperCase()}`,
    `concluiu a trilha: ${dados.nome}`,
    `Nível: ${nivel} | Carga horária: ${dados.duracao_horas} horas`,
    ``,
    `📅 Emitido em: ${dataEmissao}`,
    `🔑 Código: ${codigo}`,
    ``,
    `⚠️ Este é um certificado FICTÍCIO gerado pelo Geo-Explorer.`,
  ].join("\n");
}

// ──────────────────────────────────────────────
// Servidor MCP
// ──────────────────────────────────────────────

const server = new McpServer({
  name: "geo-explorer",
  version: "1.0.0",
});

server.registerTool(
  "geo_trilha",
  {
    description:
      "Retorna um plano de estudos completo para a tecnologia e nível informados. Use para orientar trilhas de aprendizagem.",
    inputSchema: z.object({
      tecnologia: z
        .string()
        .describe("ID da tecnologia. Valores aceitos: javascript, python, react, node, typescript"),
      nivel: z
        .enum(["iniciante", "intermediario", "avancado"])
        .default("iniciante")
        .describe("Nível da trilha"),
    }),
  },
  async ({ tecnologia, nivel }) => {
    const resultado = gerarTrilha(tecnologia, nivel);
    return { content: [{ type: "text", text: resultado }] };
  }
);

server.registerTool(
  "geo_desafio",
  {
    description:
      "Gera um desafio de código com enunciado, template e dica para a tecnologia e nível informados.",
    inputSchema: z.object({
      tecnologia: z
        .string()
        .describe("ID da tecnologia. Valores aceitos: javascript, python, react, node, typescript"),
      nivel: z
        .enum(["iniciante", "intermediario", "avancado"])
        .default("iniciante")
        .describe("Nível do desafio"),
    }),
  },
  async ({ tecnologia, nivel }) => {
    const resultado = gerarDesafio(tecnologia, nivel);
    return { content: [{ type: "text", text: resultado }] };
  }
);

server.registerTool(
  "geo_certificado",
  {
    description:
      "Gera um certificado fictício de conclusão de trilha com código único de verificação.",
    inputSchema: z.object({
      tecnologia: z
        .string()
        .describe("ID da tecnologia concluída"),
      nome: z
        .string()
        .describe("Nome completo da pessoa a ser certificada"),
      nivel: z
        .enum(["iniciante", "intermediario", "avancado"])
        .default("iniciante")
        .describe("Nível concluído"),
    }),
  },
  async ({ tecnologia, nome, nivel }) => {
    const resultado = gerarCertificado(tecnologia, nome, nivel);
    return { content: [{ type: "text", text: resultado }] };
  }
);

// ──────────────────────────────────────────────
// Prompt: sugerindo uso do Geo-Explorer
// ──────────────────────────────────────────────

server.registerPrompt(
  "geo_inicio",
  {
    description: "Prompt de boas-vindas que orienta como usar o Geo-Explorer",
    argsSchema: z.object({
      nome: z.string().optional().describe("Nome do usuário"),
    }),
  },
  async ({ nome }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `${nome ? `Olá, ${nome}!` : "Olá!"} Sou o Geo-Explorer. Posso te ajudar com:\n\n1. 📚 Trilhas de estudo (geo_trilha)\n2. 💻 Desafios de código (geo_desafio)\n3. 🏆 Certificados fictícios (geo_certificado)\n\nTecnologias: javascript, python, react, node, typescript\nNíveis: iniciante, intermediario, avancado\n\nComo posso te ajudar hoje?`,
        },
      },
    ],
  })
);

// ──────────────────────────────────────────────
// Inicialização
// ──────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Geo-Explorer MCP Server iniciado (stdio)");
}

main().catch((error) => {
  console.error("Erro fatal:", error);
  process.exit(1);
});
