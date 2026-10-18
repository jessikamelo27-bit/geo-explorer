# Configurando o Servidor MCP do Geo-Explorer

Este guia explica como compilar e registrar o servidor MCP do Geo-Explorer no IBM Bob.

---

## Pré-requisitos

- Node.js v18+
- Projeto clonado localmente

---

## 1. Compilar o servidor

```bash
cd geo-explorer/mcp
npm install
npm run build
```

O arquivo compilado será gerado em `mcp/build/index.js`.

---

## 2. Registrar no IBM Bob

Abra o arquivo de configuração do Bob (`mcp.json`) e adicione:

```json
{
  "mcpServers": {
    "geo-explorer": {
      "command": "node",
      "args": ["/caminho/absoluto/para/geo-explorer/mcp/build/index.js"]
    }
  }
}
```

> **Importante:** substitua o caminho pelo caminho absoluto real no seu sistema.

### Exemplo no Windows

```json
{
  "mcpServers": {
    "geo-explorer": {
      "command": "node",
      "args": ["C:/projetos/geo-explorer/mcp/build/index.js"]
    }
  }
}
```

### Exemplo no macOS/Linux

```json
{
  "mcpServers": {
    "geo-explorer": {
      "command": "node",
      "args": ["/home/usuario/projetos/geo-explorer/mcp/build/index.js"]
    }
  }
}
```

---

## 3. Verificar a conexão

Após salvar o `mcp.json`, o Bob recarrega automaticamente os servidores MCP.

Você pode testar pedindo ao Bob:

- *"Use geo_trilha para mostrar a trilha de React intermediário"*
- *"Use geo_desafio para me dar um desafio de TypeScript avançado"*
- *"Use geo_certificado para gerar um certificado de Python para Ana Lima"*

---

## Ferramentas disponíveis

| Ferramenta | Parâmetros obrigatórios | Parâmetros opcionais |
|---|---|---|
| `geo_trilha` | `tecnologia` | `nivel` (padrão: `iniciante`) |
| `geo_desafio` | `tecnologia` | `nivel` (padrão: `iniciante`) |
| `geo_certificado` | `tecnologia`, `nome` | `nivel` (padrão: `iniciante`) |

---

## Prompt disponível

| Prompt | Parâmetros | Descrição |
|---|---|---|
| `geo_inicio` | `nome` *(opcional)* | Boas-vindas e orientação sobre o Geo-Explorer |

---

## Solução de problemas

**Servidor não aparece como conectado:**
1. Verifique se o caminho em `args` está correto e absoluto
2. Confirme que o build foi executado (`mcp/build/index.js` existe)
3. Reinicie o Bob após alterar o `mcp.json`

**Erro ao carregar trilhas:**
- O servidor lê o arquivo `src/data/trilhas.json` relativo ao repositório
- Certifique-se de que a estrutura de pastas não foi alterada
