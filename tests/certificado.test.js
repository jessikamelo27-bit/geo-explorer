import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { certificado } from "../src/commands/certificado.js";

describe("Comando: certificado", () => {
  it("gera certificado para JavaScript com nome informado", () => {
    const resultado = certificado("javascript", "Maria Silva");
    assert.ok(resultado.includes("GEO-EXPLORER ACADEMY"));
    assert.ok(resultado.includes("MARIA SILVA"));
    assert.ok(resultado.includes("JavaScript Moderno"));
  });

  it("exibe o nível correto no certificado", () => {
    const resultado = certificado("python", "João Santos", "intermediario");
    assert.ok(resultado.includes("Intermediario"));
    assert.ok(resultado.includes("Python para Desenvolvimento"));
  });

  it("usa nível 'iniciante' como padrão", () => {
    const resultado = certificado("react", "Ana Lima");
    assert.ok(resultado.includes("Iniciante"));
  });

  it("gera código único de certificado", () => {
    const resultado = certificado("typescript", "Carlos Souza", "avancado");
    assert.ok(resultado.includes("GEO-TY-AVA-"));
  });

  it("exibe a carga horária da trilha", () => {
    const resultado = certificado("node", "Pedro Costa");
    assert.ok(resultado.includes("horas"));
  });

  it("retorna erro quando tecnologia não é informada", () => {
    const resultado = certificado(undefined, "Maria Silva");
    assert.ok(resultado.startsWith("❌"));
    assert.ok(resultado.includes("Informe a tecnologia"));
  });

  it("retorna erro quando nome não é informado", () => {
    const resultado = certificado("javascript", undefined);
    assert.ok(resultado.startsWith("❌"));
    assert.ok(resultado.includes("Informe o nome"));
  });

  it("retorna erro quando nome é string vazia", () => {
    const resultado = certificado("javascript", "   ");
    assert.ok(resultado.startsWith("❌"));
  });

  it("retorna erro para tecnologia inexistente", () => {
    const resultado = certificado("cobol", "Ada Lovelace");
    assert.ok(resultado.startsWith("❌"));
    assert.ok(resultado.includes("não encontrada"));
  });

  it("retorna erro para nível inválido", () => {
    const resultado = certificado("javascript", "Ada Lovelace", "senior");
    assert.ok(resultado.startsWith("❌"));
    assert.ok(resultado.includes("inválido"));
  });

  it("exibe aviso de certificado fictício", () => {
    const resultado = certificado("javascript", "Aluno Teste");
    assert.ok(resultado.includes("FICTÍCIO"));
  });
});
