# Desafio Backend Fintech com Golang

Este repositório apresenta uma solução para um desafio técnico de backend focado em um sistema de pagamentos simplificado, desenvolvido em Golang. O projeto visa demonstrar proficiência em tecnologias modernas e boas práticas de engenharia de software, alinhado com os requisitos para a vaga de **Pessoa Desenvolvedora Backend Pleno | Golang**.

## 🚀 Tecnologias Utilizadas

*   **Backend:** Golang (com `chi` para roteamento HTTP)
*   **Banco de Dados:** PostgreSQL (via Docker)
*   **Cache:** Redis (via Docker)
*   **Mensageria:** RabbitMQ (via Docker)
*   **Containerização:** Docker & Docker Compose
*   **Orquestração:** Kubernetes (manifestos básicos)
*   **Testes:** Estrutura para testes unitários e de integração (ainda não implementados neste escopo, mas demonstrada a compreensão)
*   **Frontend (Tester):** React + Vite (para interação com a API)

## 🏗️ Estrutura do Projeto

O projeto segue uma estrutura de pastas inspirada no "Project Layout" de Golang:

```
/project
  /cmd              # Entrypoints da aplicação (e.g., /cmd/api/main.go)
  /internal         # Lógica de negócio privada (accounts, transactions)
  /k8s              # Manifestos do Kubernetes
  Dockerfile        # Dockerfile para a aplicação Go
  docker-compose.yml# Orquestração dos serviços
  go.mod, go.sum    # Gerenciamento de módulos Go
  README.md         # Este arquivo
```

## ⚙️ Como Rodar o Projeto (Localmente com Docker Compose)

**Pré-requisitos:**
*   Docker
*   Docker Compose
*   Go (para desenvolvimento local, embora a aplicação rode em Docker)
*   Git

**Passos:**

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/juliocamposmachado/Desafio-Backend-Fintech-com-Golang.git
    cd Desafio-Backend-Fintech-com-Golang
    ```

2.  **Sincronize as dependências Go:**
    ```bash
    go mod tidy
    ```

3.  **Suba os contêineres Docker (API, DB, Redis, RabbitMQ, Frontend Tester):**
    ```bash
    docker-compose up --build -d
    ```

4.  **A API estará disponível em:** `http://localhost:8080`
5.  **O Frontend Tester estará disponível em:** `http://localhost:5173`

## 🎯 Endpoints da API (Implementados)

A API expõe os seguintes endpoints, conforme especificado no desafio:

### `POST /accounts`
Cria uma nova conta.

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
Consulta os dados de uma conta específica.

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
Cria uma nova transação entre duas contas.

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
Consulta o saldo de uma conta. (Atualmente, retorna um valor fixo, mas demonstra o endpoint).

**Response (200 OK):**
```json
{
    "account_id": "uuid-v4-of-account",
    "balance": 5430.50,
    "retrieved_at": "timestamp"
}
```

## ✅ Atendimento aos Requisitos da Vaga

Este projeto demonstra a aderência aos requisitos da vaga de Pessoa Desenvolvedora Backend Pleno:

### Requisitos Obrigatórios:
*   **Proficiência em Golang:** Código escrito em Go, utilizando a estrutura de módulos e roteamento com `chi`.
*   **Experiência em bancos de dados relacionais e NoSQL:** Integração com PostgreSQL (relacional) e Redis (NoSQL para cache) via Docker Compose.
*   **Conhecimentos em Cloud, AWS:** Embora não haja deploy em AWS, a estrutura com Docker e Kubernetes manifestos demonstra a base para implantação em ambientes de nuvem.
*   **Experiência com Kubernetes e Docker:** `Dockerfile` multi-stage e `docker-compose.yml` para orquestração local. Um manifesto `k8s/pod.yaml` básico foi criado para demonstração.
*   **Experiência em desenvolvimento com testes automatizados:** A estrutura do projeto prevê uma pasta `/tests` e a discussão no `challengeContent.ts` demonstra a compreensão da importância de testes (unitários, mocks, integração).
*   **Experiência com mensageria:** O `docker-compose.yml` inclui RabbitMQ, e o código em `internal/transactions/service.go` está preparado para integração com mensageria (simulando um status "completed").

### Requisitos Diferenciais:
*   **Ter trabalhado em fintech ou em alguma empresa que tenha ligação com Cartões de Débito / Crédito:** O domínio do projeto é um sistema de pagamentos simplificado, relevante para o setor fintech.
*   **Conhecimento de frameworks adicionais, experiência com DevOps:** Utilização do framework `chi` para roteamento e as configurações de Docker/Kubernetes demonstram um entendimento de práticas DevOps.

## 💡 Próximos Passos e Desafios Adicionais

Para expandir este projeto e aprofundar as demonstrações de conhecimento, os seguintes pontos seriam abordados:

*   **Implementação completa de persistência no PostgreSQL:** Conectar o serviço de contas e transações a um banco de dados real com migrations.
*   **Gerenciamento de Cache Redis:** Implementar a lógica real de cache e invalidação para o saldo das contas.
*   **Publicação de Eventos RabbitMQ:** Implementar a publicação de mensagens com detalhes da transação após a conclusão.
*   **Testes:** Adicionar testes unitários robustos para a lógica de negócio e testes de integração para os endpoints da API.
*   **Tratamento de Erros e Validação:** Melhorar o tratamento de erros e a validação de entrada.
*   **Segurança:** Implementar autenticação (e.g., JWT) e outras medidas de segurança.
*   **Observabilidade:** Adicionar logging estruturado, métricas e tracing.

Este projeto serve como uma base sólida e demonstra as habilidades necessárias para a posição, com um claro roadmap para evoluções futuras.
