import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Carrega e retorna todas as trilhas do arquivo JSON.
 * @returns {object[]} Array de trilhas
 */
export function carregarTrilhas() {
  const caminho = join(__dirname, "../data/trilhas.json");
  const conteudo = readFileSync(caminho, "utf-8");
  return JSON.parse(conteudo).trilhas;
}

/**
 * Busca uma trilha pelo ID (case-insensitive).
 * @param {string} id
 * @returns {object|null}
 */
export function buscarTrilha(id) {
  const trilhas = carregarTrilhas();
  return trilhas.find((t) => t.id === id.toLowerCase()) || null;
}

/**
 * Retorna os IDs disponíveis de trilhas.
 * @returns {string[]}
 */
export function listarIds() {
  return carregarTrilhas().map((t) => t.id);
}
