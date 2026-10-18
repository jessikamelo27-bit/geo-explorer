import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { desafio } from "../src/commands/desafio.js";

describe("Comando: desafio", () => {
  it("gera desafio de JavaScript iniciante", () => {
    const resultado = desafio("javascript", "iniciante");
    assert.ok(resultado.includes("GEO-EXPLORER — DESAFIO"));
    assert.ok(resultado.includes("JavaScript"));
    assert.ok(resultado.includes("somaArray"));
  });

  it("gera desafio de Python avançado", () => {
    const resultado = desafio("python", "avancado");
    assert.ok(resultado.includes("cache_resultado"));
    assert.ok(resultado.includes("Avancado"));
  });

  it("gera desafio de React intermediário", () => {
    const resultado = desafio("react", "intermediario");
    assert.ok(resultado.includes("useFetch"));
  });

  it("usa nível 'iniciante' como padrão", () => {
    const resultado = desafio("node");
    assert.ok(resultado.includes("Iniciante"));
  });

  it("retorna erro para tecnologia inexistente", () => {
    const resultado = desafio("rust", "iniciante");
    assert.ok(resultado.startsWith("❌"));
    assert.ok(resultado.includes("não encontrada"));
  });

  it("retorna erro para nível inválido", () => {
    const resultado = desafio("javascript", "mestre");
    assert.ok(resultado.startsWith("❌"));
    assert.ok(resultado.includes("inválido"));
  });

  it("retorna erro quando tecnologia não é informada", () => {
    const resultado = desafio(undefined);
    assert.ok(resultado.startsWith("❌"));
    assert.ok(resultado.includes("Informe uma tecnologia"));
  });

  it("inclui ID único no desafio gerado", () => {
    const resultado = desafio("typescript", "intermediario");
    assert.ok(resultado.includes("ID do Desafio"));
    assert.ok(resultado.includes("typescript-intermediario-"));
  });

  it("inclui template inicial no desafio", () => {
    const resultado = desafio("javascript", "iniciante");
    assert.ok(resultado.includes("Template Inicial"));
    assert.ok(resultado.includes("function somaArray"));
  });
});
