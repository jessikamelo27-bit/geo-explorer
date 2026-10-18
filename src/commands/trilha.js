import { buscarTrilha, listarIds } from "../utils/loader.js";

/**
 * Exibe a trilha de estudos de uma tecnologia.
 * @param {string} tecnologia - ID da tecnologia (ex: javascript, python)
 * @param {string} [nivel="iniciante"] - Nível da trilha
 * @returns {string} Texto formatado com o plano de estudos
 */
export function trilha(tecnologia, nivel = "iniciante") {
  if (!tecnologia) {
    const disponiveis = listarIds().join(", ");
    return `❌ Informe uma tecnologia.\n\nTrilhas disponíveis: ${disponiveis}`;
  }

  const dados = buscarTrilha(tecnologia);
  if (!dados) {
    const disponiveis = listarIds().join(", ");
    return `❌ Trilha "${tecnologia}" não encontrada.\n\nTrilhas disponíveis: ${disponiveis}`;
  }

  const niveisValidos = ["iniciante", "intermediario", "avancado"];
  if (!niveisValidos.includes(nivel)) {
    return `❌ Nível "${nivel}" inválido.\n\nNíveis válidos: ${niveisValidos.join(", ")}`;
  }

  const dadosNivel = dados.niveis[nivel];
  if (!dadosNivel) {
    return `❌ Nível "${nivel}" não disponível para a trilha "${dados.nome}".`;
  }

  const linhas = [
    `╔══════════════════════════════════════════╗`,
    `║       🗺️  GEO-EXPLORER — TRILHA          ║`,
    `╚══════════════════════════════════════════╝`,
    ``,
    `📚 Trilha: ${dados.nome}`,
    `🎯 Nível: ${nivel.charAt(0).toUpperCase() + nivel.slice(1)}`,
    `⏱️  Duração estimada: ${dados.duracao_horas} horas no total`,
    `📝 ${dados.descricao}`,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `📋 Módulos da Trilha`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
  ];

  for (const modulo of dadosNivel.modulos) {
    linhas.push(``, `  ${modulo.ordem}. ${modulo.titulo}`);
    for (const topico of modulo.topicos) {
      linhas.push(`     • ${topico}`);
    }
  }

  linhas.push(
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `💡 Dica: use o comando "desafio" para praticar!`,
    `   geo-explorer desafio ${tecnologia} ${nivel}`
  );

  return linhas.join("\n");
}
