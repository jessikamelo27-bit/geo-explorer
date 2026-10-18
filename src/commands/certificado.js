import { buscarTrilha, listarIds } from "../utils/loader.js";

/**
 * Gera um certificado fictício de conclusão de trilha.
 * @param {string} tecnologia - ID da tecnologia
 * @param {string} nome - Nome da pessoa
 * @param {string} [nivel="iniciante"] - Nível concluído
 * @returns {string} Certificado formatado em texto
 */
export function certificado(tecnologia, nome, nivel = "iniciante") {
  if (!tecnologia) {
    const disponiveis = listarIds().join(", ");
    return `❌ Informe a tecnologia da trilha concluída.\n\nTrilhas disponíveis: ${disponiveis}`;
  }

  if (!nome || nome.trim() === "") {
    return `❌ Informe o nome da pessoa certificada.\n\nExemplo: geo-explorer certificado javascript "Maria Silva"`;
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

  const dataEmissao = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const codigo = gerarCodigoCertificado(nome, tecnologia, nivel);
  const nomeMaiusculo = nome.trim().toUpperCase();
  const nivelLabel = nivel.charAt(0).toUpperCase() + nivel.slice(1);

  const linhas = [
    ``,
    `  ╔══════════════════════════════════════════════════════╗`,
    `  ║                                                      ║`,
    `  ║            🌍  GEO-EXPLORER ACADEMY  🌍             ║`,
    `  ║                                                      ║`,
    `  ║           C E R T I F I C A D O                     ║`,
    `  ║           D E   C O N C L U S Ã O                   ║`,
    `  ║                                                      ║`,
    `  ╠══════════════════════════════════════════════════════╣`,
    `  ║                                                      ║`,
    `  ║  Certificamos que                                    ║`,
    `  ║                                                      ║`,
    `  ║    ${nomeMaiusculo.padEnd(50)}║`,
    `  ║                                                      ║`,
    `  ║  concluiu com êxito a trilha de estudos              ║`,
    `  ║                                                      ║`,
    `  ║    📚 ${dados.nome.padEnd(48)}║`,
    `  ║    🎯 Nível: ${nivelLabel.padEnd(42)}║`,
    `  ║    ⏱️  Carga horária: ${String(dados.duracao_horas + " horas").padEnd(36)}║`,
    `  ║                                                      ║`,
    `  ╠══════════════════════════════════════════════════════╣`,
    `  ║                                                      ║`,
    `  ║  📅 Emitido em: ${dataEmissao.padEnd(38)}║`,
    `  ║  🔑 Código: ${codigo.padEnd(42)}║`,
    `  ║                                                      ║`,
    `  ║  🌐 Verifique em: geo-explorer.dev/verificar         ║`,
    `  ║                                                      ║`,
    `  ╚══════════════════════════════════════════════════════╝`,
    ``,
    `  ⚠️  Este é um certificado FICTÍCIO gerado pelo Geo-Explorer.`,
    `     Criado para fins educacionais e de portfólio.`,
    ``,
  ];

  return linhas.join("\n");
}

/**
 * Gera um código único de certificado baseado nos dados.
 * @param {string} nome
 * @param {string} tecnologia
 * @param {string} nivel
 * @returns {string}
 */
function gerarCodigoCertificado(nome, tecnologia, nivel) {
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
