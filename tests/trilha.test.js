import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { trilha } from "../src/commands/trilha.js";

describe("Comando: trilha", () => {
  it("retorna a trilha de JavaScript no nível iniciante", () => {
    const resultado = trilha("javascript", "iniciante");
    assert.ok(resultado.includes("JavaScript Moderno"));
    assert.ok(resultado.includes("Iniciante"));
    assert.ok(resultado.includes("Fundamentos de JavaScript"));
  });

  it("retorna a trilha de Python no nível intermediário", () => {
    const resultado = trilha("python", "intermediario");
    assert.ok(resultado.includes("Python para Desenvolvimento"));
    assert.ok(resultado.includes("Programação Orientada a Objetos"));
  });

  it("usa nível 'iniciante' como padrão quando não informado", () => {
    const resultado = trilha("react");
    assert.ok(resultado.includes("Iniciante"));
    assert.ok(resultado.includes("Fundamentos do React"));
  });

  it("é case-insensitive para o ID da tecnologia", () => {
    const resultado = trilha("JAVASCRIPT", "iniciante");
    assert.ok(resultado.includes("JavaScript Moderno"));
  });

  it("retorna erro para tecnologia inexistente", () => {
    const resultado = trilha("cobol", "iniciante");
    assert.ok(resultado.startsWith("❌"));
    assert.ok(resultado.includes("não encontrada"));
  });

  it("retorna erro para nível inválido", () => {
    const resultado = trilha("javascript", "expert");
    assert.ok(resultado.startsWith("❌"));
    assert.ok(resultado.includes("inválido"));
  });

  it("retorna erro quando tecnologia não é informada", () => {
    const resultado = trilha(undefined);
    assert.ok(resultado.startsWith("❌"));
    assert.ok(resultado.includes("Informe uma tecnologia"));
  });

  it("lista tecnologias disponíveis na mensagem de erro", () => {
    const resultado = trilha("inexistente");
    assert.ok(resultado.includes("javascript"));
    assert.ok(resultado.includes("python"));
  });
});
