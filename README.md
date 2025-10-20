🚀 Bootcamp Helper - Automação E2E para Extensão Chrome
Este projeto demonstra a criação e automação de testes End-to-End (E2E) para uma Extensão do Google Chrome (MV3) usando Playwright e contêineres Docker. A pipeline de Integração Contínua (CI) é gerenciada pelo GitHub Actions, garantindo que o build, os testes e o empacotamento da extensão sejam totalmente automatizados.

🎯 Objetivo
O objetivo principal é:

Desenvolver uma Extensão Chrome MV3 simples.

Empacotar a extensão (geração do .zip e diretório dist).

Executar uma suíte de testes E2E com Playwright dentro de um contêiner (Docker/Docker Compose).

Automatizar todo o processo (build, teste, publicação de artefatos) no GitHub Actions.

📁 Estrutura do Projeto
A estrutura de pastas segue os requisitos técnicos para a organização dos arquivos de build, testes e CI.

my-chrome-extension/
├── src/                      # Código-fonte da extensão (popup, content, background)
├── tests/
│   └── extension.spec.ts     # Suíte de testes E2E com Playwright
├── scripts/
│   └── build-extension.mjs   # Script Node.js para build e empacotamento da extensão (.zip)
├── .github/
│   └── workflows/
│       └── ci.yml            # Pipeline de CI com GitHub Actions
├── dist/                     # Diretório de build (ignorado pelo Git, criado no build)
├── Dockerfile                # Definição do ambiente de testes Playwright
├── docker-compose.yml        # Orquestração para execução local dos testes
├── package.json              # Metadados e scripts de execução
├── playwright.config.ts      # Configuração do Playwright (carrega a extensão para testes)
└── README.md                 # Este arquivo
🛠️ Requisitos
Para executar o projeto localmente, você precisará ter instalado:

Node.js (v18 ou superior)

npm (instalado com Node.js)

Docker e Docker Compose

⚙️ Execução Local
Você pode rodar os testes localmente usando o Docker Compose, simulando o ambiente da CI.

1. Build da Imagem
Primeiro, construa a imagem Docker que contém o Playwright, o Node.js e todas as dependências:

Bash

docker compose build
2. Execução dos Testes E2E
O comando docker compose run executa a suíte de testes E2E completa. Ele:

Roda o script de build (npm run build) para gerar a pasta dist/ e o dist/extension.zip.

Executa os testes Playwright, carregando a extensão a partir da pasta dist/ no Chromium.

Bash

docker compose run --rm e2e
3. Visualização do Relatório
Após a execução, um relatório HTML detalhado será gerado na pasta playwright-report. Para abri-lo:

Bash

npx playwright show-report
🧪 Pipeline de Integração Contínua (CI)
A automação do projeto é feita via GitHub Actions usando o arquivo .github/workflows/ci.yml.

A pipeline é acionada em todo push para o branch main e em todo pull_request. Ela realiza as seguintes etapas:

Instalação de Dependências: Instala pacotes Node.js e o Chromium com dependências.

Build da Extensão: Executa o script de build (npm run build).

Testes E2E: Executa npm run test:e2e para rodar os testes Playwright.

Publicação de Artefatos:

Publica o relatório HTML do Playwright como artefato (playwright-report).

Publica o pacote da extensão (dist/extension.zip) como artefato (extension-zip).

Status da CI
