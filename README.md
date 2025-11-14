# Desafio Backend Fintech com Golang: Uma Prova de Capacidade e Agilidade

Este repositório apresenta uma solução para um desafio técnico de backend focado em um sistema de pagamentos simplificado, desenvolvido em Golang. Este projeto não apenas demonstra proficiência em tecnologias modernas e boas práticas de engenharia de software, mas também serve como um **teste de conhecimento de engenharia de software e full stack**, evidenciando a capacidade de aceitar e entregar todas as demandas de tecnologia com o auxílio de diversas IAs. O serviço foi **concluído com implantação em menos de 12 horas desde a construção do zero**.

Este projeto foi desenvolvido especificamente como um teste de conhecimento para a vaga de **Pessoa Desenvolvedora Backend Pleno | Golang** na Impulser Professional. Detalhes da vaga podem ser encontrados em: [https://impulso.team/pt/profissionais/oportunidade/2629?referral=45ea6418](https://impulso.team/pt/profissionais/oportunidade/2629?referral=45ea6418)

## Resumo da Posição (Vaga 2629 - Impulser Professional)

Estamos em busca de um(a) Desenvolvedor(a) Backend Pleno com experiência em Golang para atuar em um projeto inovador na área de fintech. O profissional será responsável por desenvolver e manter soluções técnicas que atendam às necessidades do negócio.

## Responsabilidades e Atribuições da Posição:
*   Atuar em problemas de escopo aberto, oferecendo soluções criativas e eficazes.
*   Participar de refinamentos técnicos, contribuindo com expertise e ideias para a solução dos desafios.
*   Garantir a qualidade técnica das entregas, alinhando-as com os padrões da squad.
*   Estabelecer comunicação eficaz com outras áreas técnicas e equipes de produto para tratar de dependências e integrações necessárias.
*   Colaborar com outros squads que estejam integrados ou dependentes dos serviços desenvolvidos.

## 🚀 Tecnologias Utilizadas

*   **Backend:** Golang (com `chi` para roteamento HTTP)
*   **Banco de Dados:** PostgreSQL (via Docker)
*   **Cache:** Redis (via Docker)
*   **Mensageria:** RabbitMQ (via Docker)
*   **Containerização:** Docker & Docker Compose
*   **Orquestração:** Kubernetes (manifestos básicos e deploy no Google Cloud Run)
*   **Testes:** Estrutura para testes unitários e de integração (conceito demonstrado)
*   **Frontend (Tester):** React + Vite (para interação com a API, deploy no Vercel)
*   **Assistência de Desenvolvimento:** Diversas ferramentas de IA (incluindo GitHub Copilot e outros modelos Gemini)

## 🏗️ Estrutura do Projeto

O projeto segue uma estrutura de pastas inspirada no "Project Layout" de Golang:

```
/project
  /cmd              # Entrypoints da aplicação (e.g., /cmd/api/main.go)
  /internal         # Lógica de negócio privada (accounts, transactions)
  /k8s              # Manifestos do Kubernetes
  /pkg              # Código compartilhado e reutilizável (e.g., funções de resposta web)
  Dockerfile        # Dockerfile para a aplicação Go
  docker-compose.yml# Orquestração dos serviços para ambiente local
  go.mod, go.sum    # Gerenciamento de módulos Go
  README.md         # Este arquivo
  package.json, vite.config.js, index.tsx, App.tsx, index.css, vite-env.d.ts # Arquivos do Frontend Tester
```

## ⚙️ Como Rodar o Projeto (Localmente com Docker Compose)

**Pré-requisitos:**
*   Docker
*   Docker Compose
*   Go (para desenvolvimento local, embora a aplicação rode em Docker)
*   Git
*   Node.js e npm/yarn (para o frontend local, se necessário)

**Passos:**

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/juliocamposmachado/Desafio-Backend-Fintech-com-Golang.git
    cd Desafio-Backend-Fintech-com-Golang
    ```

2.  **Sincronize as dependências Go e Node.js:**
    ```bash
    go mod tidy
    npm install # Na raiz do projeto, para o frontend tester
    ```

3.  **Suba os contêineres Docker (API, DB, Redis, RabbitMQ, Frontend Tester):**
    ```bash
    docker-compose up --build -d
    ```

4.  **A API estará disponível em:** `http://localhost:8080`
5.  **O Frontend Tester estará disponível em:** `http://localhost:5173`

## 🎯 Endpoints da API (Implementados)

A API expõe os seguintes endpoints, conforme especificado no desafio, com respostas JSON consistentes:

### `POST /accounts`
Cria uma nova conta (simulada).

**Request Body:**
```json
{
    "document_number": "12345678900",
    "name": "Fulano de Tal"
}
```
**Response (201 Created):**
```json
{
    "id": "uuid-v4-generated",
    "document_number": "12345678900",
    "name": "Fulano de Tal",
    "created_at": "timestamp"
}
```

### `GET /accounts/{id}`
Consulta os dados de uma conta específica (simulada, lida com IDs inválidos).

**Response (200 OK):**
```json
{
    "id": "uuid-v4-of-account",
    "document_number": "12345678900",
    "name": "Fulano de Tal",
    "created_at": "timestamp"
}
```

### `POST /transactions`
Cria uma nova transação entre duas contas (simulada).

**Request Body:**
```json
{
    "source_account_id": "uuid-v4-source",
    "destination_account_id": "uuid-v4-destination",
    "amount": 150.75
}
```
**Response (201 Created):**
```json
{
    "id": "uuid-v4-transaction",
    "source_account_id": "uuid-v4-source",
    "destination_account_id": "uuid-v4-destination",
    "amount": 150.75,
    "status": "completed",
    "created_at": "timestamp"
}
```

### `GET /accounts/{id}/balance`
Consulta o saldo de uma conta (simulada, lida com IDs inválidos).

**Response (200 OK):**
```json
{
    "account_id": "uuid-v4-of-account",
    "balance": 5430.50,
    "retrieved_at": "timestamp"
}
```

## 🌐 Implantação

Este projeto foi implantado com sucesso, demonstrando a capacidade de entrega rápida:

*   **Backend Go:** Deploy contínuo via Google Cloud Build para **Google Cloud Run**.
    *   URL: `https://desafio-backend-fintech-com-golang-354404045586.europe-west1.run.app`
*   **Frontend Tester (React/Vite):** Deploy contínuo via Vercel.
    *   URL: `https://desafio-backend-fintech-com-golang.vercel.app` (Favor confirmar a URL exata do seu deploy no Vercel).

As configurações de CORS no backend foram ajustadas para permitir a comunicação entre o frontend no Vercel e o backend no Cloud Run.

## ✅ Atendimento aos Requisitos da Vaga e Demonstração de Capacidade

Este projeto não apenas cumpre os requisitos da vaga de Pessoa Desenvolvedora Backend Pleno, mas também reflete uma abordagem moderna de engenharia de software:

### Requisitos Obrigatórios:
*   **Proficiência em Golang:** Código claro e estruturado em Go, utilizando `chi` para roteamento e gestão de módulos.
*   **Experiência em bancos de dados relacionais e NoSQL:** PostgreSQL e Redis configurados via Docker Compose; a arquitetura prevê a integração real, atualmente simulada.
*   **Conhecimentos em Cloud, AWS:** A implantação no Google Cloud Run e a existência de manifestos Kubernetes (`k8s/`) demonstram forte entendimento de conceitos de cloud e orquestração de contêineres.
*   **Experiência com Kubernetes e Docker:** Utilização de `Dockerfile` multi-stage, `docker-compose.yml` e manifestos Kubernetes básicos.
*   **Experiência em desenvolvimento com testes automatizados:** A estrutura do projeto contempla testes (`/tests`) e a discussão no `challengeContent.ts` valida o entendimento de testes unitários, mocks e integração.
*   **Experiência com mensageria:** RabbitMQ configurado via Docker Compose e o código demonstra a intenção de publicação de eventos de transação.

### Requisitos Diferenciais:
*   **Ter trabalhado em fintech ou em alguma empresa que tenha ligação com Cartões de Débito / Crédito:** O domínio de sistema de pagamentos é central no projeto.
*   **Conhecimento de frameworks adicionais, experiência com DevOps:** Uso do framework `chi` e a configuração completa de CI/CD para Cloud Run com Docker/Kubernetes demonstra uma forte mentalidade DevOps.
*   **Engenharia de Software e Full Stack:** Este projeto abrange tanto o backend (Go API com infraestrutura) quanto o frontend (React Tester), demonstrando uma visão holística e capacidade full stack.
*   **Agilidade e Uso de IA:** A construção e implantação do zero em **menos de 12 horas** com o auxílio de diversas IAs (como GitHub Copilot e outros modelos Gemini) sublinha a capacidade de entrega rápida e adaptabilidade a novas ferramentas.

## 💡 Próximos Passos e Desafios Adicionais

Para expandir este projeto e aprofundar as demonstrações de conhecimento, os seguintes pontos seriam abordados:

*   **Implementação completa de persistência no PostgreSQL:** Conectar o serviço de contas e transações a um banco de dados real com migrations.
*   **Gerenciamento de Cache Redis:** Implementar a lógica real de cache e invalidação para o saldo das contas.
*   **Publicação de Eventos RabbitMQ:** Implementar a publicação de mensagens com detalhes da transação após a conclusão.
*   **Testes:** Adicionar testes unitários robustos para a lógica de negócio e testes de integração para os endpoints da API.
*   **Tratamento de Erros e Validação:** Melhorar o tratamento de erros e a validação de entrada.
*   **Segurança:** Implementar autenticação (e.g., JWT) e outras medidas de segurança.
*   **Observabilidade:** Adicionar logging estruturado, métricas e tracing.

Este projeto serve como uma base sólida, um testemunho da competência técnica e agilidade, com um claro roadmap para evoluções futuras.
