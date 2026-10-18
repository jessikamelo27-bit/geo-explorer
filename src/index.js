#!/usr/bin/env node
/**
 * CLI do Geo-Explorer
 * Uso:
 *   geo-explorer trilha <tecnologia> [nivel]
 *   geo-explorer desafio <tecnologia> [nivel]
 *   geo-explorer certificado <tecnologia> <nome> [nivel]
 */

import { trilha } from "./commands/trilha.js";
import { desafio } from "./commands/desafio.js";
import { certificado } from "./commands/certificado.js";
import { listarIds } from "./utils/loader.js";

const [, , comando, ...args] = process.argv;

const AJUDA = `
╔══════════════════════════════════════════════════╗
║          🌍  GEO-EXPLORER — CLI  v1.0.0          ║
╚══════════════════════════════════════════════════╝

Comandos disponíveis:

  trilha <tecnologia> [nivel]
    Exibe a trilha de estudos para a tecnologia escolhida.
    Níveis: iniciante (padrão) | intermediario | avancado

  desafio <tecnologia> [nivel]
    Gera um desafio de código para praticar.
    Níveis: iniciante (padrão) | intermediario | avancado

  certificado <tecnologia> "<nome>" [nivel]
    Cria um certificado fictício de conclusão.

  help | --help | -h
    Exibe esta mensagem de ajuda.

Exemplos:
  geo-explorer trilha javascript
  geo-explorer trilha python intermediario
  geo-explorer desafio react avancado
  geo-explorer certificado typescript "Maria Silva" intermediario

Trilhas disponíveis: ${listarIds().join(", ")}
`;

if (!comando || ["help", "--help", "-h"].includes(comando)) {
  console.log(AJUDA);
  process.exit(0);
}

switch (comando) {
  case "trilha": {
    const [tecnologia, nivel] = args;
    console.log(trilha(tecnologia, nivel));
    break;
  }
  case "desafio": {
    const [tecnologia, nivel] = args;
    console.log(desafio(tecnologia, nivel));
    break;
  }
  case "certificado": {
    const [tecnologia, nome, nivel] = args;
    console.log(certificado(tecnologia, nome, nivel));
    break;
  }
  default:
    console.error(`❌ Comando "${comando}" não reconhecido.\n`);
    console.log(AJUDA);
    process.exit(1);
}
