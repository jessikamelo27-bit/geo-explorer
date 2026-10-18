# 🌍 Geo-Explorer

> Explore trilhas de aprendizagem, receba desafios de código e gere certificados fictícios — direto pelo terminal.

Geo-Explorer é um projeto de portfólio desenvolvido com o apoio do **IBM Bob**, como parte do desafio do bootcamp **IBM Bob IA — Nível Empresarial para Desenvolvedores** na DIO.

---

## O que é o Geo-Explorer

O Geo-Explorer é uma ferramenta de linha de comando (CLI) com três comandos principais:

| Comando | Descrição |
|---|---|
| `trilha` | Apresenta um plano de estudos completo para a tecnologia escolhida |
| `desafio` | Gera um desafio de código com enunciado, template e dica |
| `certificado` | Cria um certificado fictício de conclusão de trilha |

O projeto também inclui um **Servidor MCP** que expõe esses recursos como ferramentas para agentes de IA.

---

## Estrutura do Projeto

```
geo-explorer/
├── src/
│   ├── commands/
│   │   ├── trilha.js        # Comando de trilha de estudos
│   │   ├── desafio.js       # Comando de desafio de código
│   │   └── certificado.js   # Comando de certificado
│   ├── data/
│   │   └── trilhas.json     # Base de trilhas fictícias
│   ├── utils/
│   │   └── loader.js        # Carregamento dos dados JSON
│   └── index.js             # Ponto de entrada da CLI
├── mcp/
│   ├── src/
│   │   └── index.ts         # Servidor MCP (TypeScript)
│   ├── package.json
│   └── tsconfig.json
├── tests/
│   ├── trilha.test.js
│   ├── desafio.test.js
│   └── certificado.test.js
├── docs/
│   └── mcp-config.md        # Guia de configuração do MCP
├── package.json
└── README.md
```

---

## Pré-requisitos

- **Node.js** v18 ou superior
- **npm** v8 ou superior

Verifique com:

```bash
node --version
npm --version
```

---

## Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/<seu-usuario>/geo-explorer.git
cd geo-explorer
```

### 2. Execute um comando diretamente

Não é necessário instalar dependências para a CLI principal:

```bash
node src/index.js trilha javascript
node src/index.js desafio python intermediario
node src/index.js certificado react "Seu Nome" avancado
```

### 3. (Opcional) Use como comando global

```bash
npm link
geo-explorer trilha node
```

---

## Como usar os comandos

### `trilha` — Plano de estudos

```bash
node src/index.js trilha <tecnologia> [nivel]
```

**Parâmetros:**
- `tecnologia` — ID da trilha: `javascript`, `python`, `react`, `node`, `typescript`
- `nivel` *(opcional)* — `iniciante` (padrão), `intermediario`, `avancado`

**Exemplos:**

```bash
node src/index.js trilha javascript
node src/index.js trilha python intermediario
node src/index.js trilha react avancado
```

---

### `desafio` — Desafio de código

```bash
node src/index.js desafio <tecnologia> [nivel]
```

**Exemplos:**

```bash
node src/index.js desafio javascript iniciante
node src/index.js desafio typescript avancado
```

---

### `certificado` — Certificado fictício

```bash
node src/index.js certificado <tecnologia> "<nome>" [nivel]
```

> ⚠️ Coloque o nome entre aspas se contiver espaços.

**Exemplos:**

```bash
node src/index.js certificado javascript "Maria Silva"
node src/index.js certificado python "João Santos" intermediario
node src/index.js certificado node "Ada Lovelace" avancado
```

---

### `help` — Ajuda

```bash
node src/index.js help
```

---

## Como executar os testes

Os testes usam o **Node.js Test Runner** nativo (sem dependências externas):

```bash
npm test
```

Ou individualmente:

```bash
node --test tests/trilha.test.js
node --test tests/desafio.test.js
node --test tests/certificado.test.js
```

**Cobertura atual:** 26 casos de teste divididos entre os três comandos.

---

## Servidor MCP

O Geo-Explorer expõe seus recursos como ferramentas MCP para uso por agentes de IA (como o IBM Bob).

### Construir o servidor

```bash
cd mcp
npm install
npm run build
```

### Ferramentas disponíveis

| Ferramenta | Parâmetros | Descrição |
|---|---|---|
| `geo_trilha` | `tecnologia`, `nivel` | Retorna plano de estudos |
| `geo_desafio` | `tecnologia`, `nivel` | Gera desafio de código |
| `geo_certificado` | `tecnologia`, `nome`, `nivel` | Emite certificado |

### Configurar no IBM Bob

Adicione ao arquivo `mcp.json` do Bob:

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

Consulte [`docs/mcp-config.md`](docs/mcp-config.md) para mais detalhes.

---

## Melhorias realizadas

- ✅ **Banco de desafios completo**: 15 desafios (5 tecnologias × 3 níveis) com enunciado, template e dica
- ✅ **Código único de certificado**: algoritmo determinístico baseado em hash
- ✅ **Servidor MCP com prompt de boas-vindas**: além das 3 ferramentas, inclui um prompt `geo_inicio`
- ✅ **Validações robustas**: todos os comandos validam entradas e retornam mensagens claras
- ✅ **26 testes automatizados**: cobrindo cenários de sucesso e de erro

---

## O que aprendi durante o desafio

- Como usar o **IBM Bob** como parceiro de desenvolvimento no modo agêntico
- Como estruturar um projeto Node.js com ES Modules (`"type": "module"`)
- Como usar o **Node.js Test Runner** nativo sem dependências externas
- Como construir e registrar um **Servidor MCP** com TypeScript
- Como expor ferramentas e prompts para agentes de IA via protocolo MCP

---

## Tecnologias utilizadas

- **Node.js** (ES Modules, Test Runner nativo)
- **JavaScript** (CLI e lógica de negócio)
- **TypeScript** (servidor MCP)
- **MCP SDK** (`@modelcontextprotocol/sdk`)
- **Zod** (validação de schema das ferramentas MCP)

---

> 🌍 Projeto desenvolvido como parte do bootcamp **IBM Bob IA — Nível Empresarial para Desenvolvedores** na [DIO](https://web.dio.me).
