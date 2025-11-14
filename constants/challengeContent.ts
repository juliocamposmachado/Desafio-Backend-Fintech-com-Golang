
export type SectionKey = 'tester' | 'readme' | 'backend' | 'infra' | 'exercicios' | 'roteiro' | 'checklist' | 'entrevista';

interface SectionContentItem {
    type: 'paragraph' | 'heading' | 'subheading' | 'list' | 'code';
    text?: string;
    items?: string[];
    language?: string;
}

interface Section {
    title: string;
    content: SectionContentItem[];
}

export const SECTIONS: Record<Exclude<SectionKey, 'tester'>, Section> = {
    readme: {
        title: "README.md",
        content: [
            { type: 'heading', text: 'Desafio Backend Fintech com Golang' },
            { type: 'paragraph', text: 'Este é um desafio técnico completo projetado para avaliar as habilidades de um(a) desenvolvedor(a) Backend Pleno em Golang, com foco no ecossistema de uma fintech. O objetivo é construir uma API REST para um sistema de pagamentos simplificado, utilizando tecnologias modernas e boas práticas de engenharia de software.' },
            
            { type: 'heading', text: 'Arquitetura da Solução' },
            { type: 'paragraph', text: 'A solução proposta segue uma arquitetura de microsserviços desacoplada, utilizando mensageria para comunicação assíncrona e cache para otimização de performance.' },
            { type: 'code', language: 'text', text: 
`+----------------+      +------------------+      +-----------------+
|   Frontend     |----->|   API Gateway    |----->|   Serviço Go    |
| (React Tester) |      | (Opcional: e.g. Kong)|      |  (Core)         |
+----------------+      +------------------+      +--------+--------+
                                                         |
                                     +-------------------+-------------------+
                                     |                   |                   |
                                     v                   v                   v
                              +------------+      +------------+      +---------------+
                              | PostgreSQL |      |    Redis   |      |   RabbitMQ    |
                              |  (Dados)   |      |  (Cache)   |      |  (Eventos)    |
                              +------------+      +------------+      +---------------+`
            },

            { type: 'heading', text: 'Como Rodar o Projeto' },
            { type: 'subheading', text: 'Pré-requisitos' },
            { type: 'list', items: ['Docker', 'Docker Compose', 'Go (para desenvolvimento local e testes)', 'Git'] },
            { type: 'subheading', text: 'Instrução' },
            { type: 'paragraph', text: '1. Clone o repositório: `git clone <your-repo-url>`' },
            { type: 'paragraph', text: '2. Navegue até a pasta do projeto: `cd project`' },
            { type: 'paragraph', text: '3. Suba os contêineres: `docker-compose up --build -d`' },
            { type: 'paragraph', text: '4. A API estará disponível em `http://localhost:8080`.' },

            { type: 'heading', text: 'Como Testar' },
            { type: 'paragraph', text: 'Para rodar os testes unitários e de integração, execute o seguinte comando na raiz do projeto:' },
            { type: 'code', language: 'bash', text: 'go test -v ./...' },

            { type: 'heading', text: 'Endpoints da API' },

            { type: 'subheading', text: 'POST /accounts' },
            { type: 'paragraph', text: 'Cria uma nova conta.' },
            { type: 'code', language: 'json', text: 
`// Request Body
{
    "document_number": "12345678900",
    "name": "Fulano de Tal"
}

// Response (201 Created)
{
    "id": "uuid-v4-generated",
    "document_number": "12345678900",
    "name": "Fulano de Tal",
    "created_at": "timestamp"
}`
            },
            
            { type: 'subheading', text: 'GET /accounts/{id}' },
            { type: 'paragraph', text: 'Consulta os dados de uma conta específica.' },
            { type: 'code', language: 'json', text: 
`// Response (200 OK)
{
    "id": "uuid-v4-of-account",
    "document_number": "12345678900",
    "name": "Fulano de Tal",
    "created_at": "timestamp"
}`
            },

            { type: 'subheading', text: 'POST /transactions' },
            { type: 'paragraph', text: 'Cria uma nova transação entre duas contas.' },
            { type: 'code', language: 'json', text: 
`// Request Body
{
    "source_account_id": "uuid-v4-source",
    "destination_account_id": "uuid-v4-destination",
    "amount": 150.75
}

// Response (201 Created)
{
    "id": "uuid-v4-transaction",
    "source_account_id": "uuid-v4-source",
    "destination_account_id": "uuid-v4-destination",
    "amount": 150.75,
    "status": "completed",
    "created_at": "timestamp"
}`
            },

            { type: 'subheading', text: 'GET /accounts/{id}/balance' },
            { type: 'paragraph', text: 'Consulta o saldo de uma conta. O saldo deve ser preferencialmente recuperado do cache (Redis).' },
            { type: 'code', language: 'json', text: 
`// Response (200 OK)
{
    "account_id": "uuid-v4-of-account",
    "balance": 5430.50,
    "retrieved_at": "timestamp"
}`
            },

            { type: 'heading', text: 'Desafios Adicionais (Opcional)' },
            { type: 'list', items: [
                'Implementar autenticação JWT nos endpoints.',
                'Criar um *worker* em Go que consome as mensagens do RabbitMQ para processar notificações (e.g., enviar um e-mail falso).',
                'Adicionar paginação na consulta de transações de uma conta.',
                'Implementar um circuit breaker para chamadas a serviços externos (simulados).',
                'Usar `gRPC` para comunicação interna entre serviços, se decidir separar em mais de um microsserviço.'
            ]},
        ],
    },
    backend: {
        title: "Desafio Backend",
        content: [
            { type: 'heading', text: 'Estrutura do Projeto' },
            { type: 'paragraph', text: 'Você deve seguir a estrutura de pastas padrão para projetos Go, conhecida como "Project Layout".' },
            { type: 'code', language: 'text', text:
`/project
  /cmd              # Entrypoints da aplicação (e.g., /cmd/api/main.go)
  /internal         # Lógica de negócio privada
    /accounts       # Domínio de contas (handlers, services, repositories)
    /transactions   # Domínio de transações
    /messaging      # Lógica de publicação no RabbitMQ
  /pkg              # Código compartilhado e reutilizável
    /db             # Conexão com DB, migrations
    /logger         # Configuração de logging
  /frontend         # Este frontend em React (já fornecido)
  /tests            # Testes de integração e E2E
  Dockerfile        # Dockerfile para a aplicação Go
  docker-compose.yml# Orquestração dos serviços (Go, Postgres, Redis, RabbitMQ)
  README.md         # Gerado a partir desta aba
  /k8s              # Manifestos do Kubernetes`
            },
            { type: 'heading', text: 'Requisitos Técnicos' },
            { type: 'subheading', text: 'API REST' },
            { type: 'list', items: [
                'Use um framework leve como `Gin` ou `Chi`. `net/http` puro também é aceitável.',
                'Implemente os 4 endpoints descritos no README.',
                'Validação de requests (e.g., campos obrigatórios, formatos).',
                'Tratamento de erros e retornos com status codes HTTP apropriados.'
            ]},
            { type: 'subheading', text: 'Banco de Dados (PostgreSQL)' },
            { type: 'list', items: [
                'Modele as tabelas `accounts` e `transactions`.',
                'Use `UUID` como chave primária.',
                'Crie *migrations* para gerenciar o schema do banco. Ferramentas como `golang-migrate/migrate` são recomendadas.',
                'A operação de transação deve ser atômica (usar transações do SQL). O saldo não deve ser armazenado na tabela `accounts`, mas calculado dinamicamente ou gerenciado de forma segura.'
            ]},
            { type: 'subheading', text: 'Cache (Redis)' },
            { type: 'list', items: [
                'Use Redis para cachear o saldo das contas (`GET /accounts/{id}/balance`).',
                'Defina uma estratégia de invalidação de cache. Quando uma nova transação é criada, o cache de saldo das contas envolvidas deve ser invalidado ou atualizado.'
            ]},
            { type: 'subheading', text: 'Mensageria (RabbitMQ)' },
            { type: 'list', items: [
                'Após uma transação ser concluída com sucesso, publique um evento em uma fila do RabbitMQ.',
                'A mensagem deve conter os detalhes da transação (ID, contas, valor).'
            ]},
            { type: 'subheading', text: 'Testes' },
            { type: 'list', items: [
                'Escreva testes unitários para a lógica de negócio (serviços).',
                'Use mocks para dependências externas (banco, cache, mensageria). A biblioteca `stretchr/testify` é altamente recomendada.',
                'Escreva testes de integração para os handlers da API, conectando a um banco de dados de teste (pode ser em Docker).'
            ]}
        ]
    },
    infra: {
        title: "Infraestrutura",
        content: [
            { type: 'heading', text: 'Containerização (Docker)' },
            { type: 'paragraph', text: 'Crie um `Dockerfile` para a aplicação Go e um `docker-compose.yml` para orquestrar todos os serviços.' },
            
            { type: 'subheading', text: 'Exemplo de Dockerfile' },
            { type: 'paragraph', text: 'Utilize um build multi-stage para criar uma imagem final leve e segura.' },
            { type: 'code', language: 'dockerfile', text:
`# Build stage
FROM golang:1.21-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

# Build the binary
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/main ./cmd/api/main.go

# Final stage
FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/main .
# Se tiver migrations, copie-as também
# COPY --from=builder /app/migrations ./migrations

# Expose port
EXPOSE 8080

# Command to run the executable
CMD ["./main"]`
            },

            { type: 'subheading', text: 'Exemplo de docker-compose.yml' },
            { type: 'code', language: 'yaml', text:
`version: '3.8'

services:
  api:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - db
      - redis
      - rabbitmq
    environment:
      # Variáveis de ambiente para conectar aos outros serviços
      POSTGRES_URL: "postgres://user:password@db:5432/fintech?sslmode=disable"
      REDIS_URL: "redis:6379"
      RABBITMQ_URL: "amqp://guest:guest@rabbitmq:5672/"

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: fintech
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  rabbitmq:
    image: rabbitmq:3-management-alpine
    ports:
      - "5672:5672"  # Para a aplicação
      - "15672:15672" # Para a UI de gerenciamento

volumes:
  postgres_data:`
            },

            { type: 'heading', text: 'Kubernetes' },
            { type: 'paragraph', text: 'Crie os manifestos Kubernetes básicos para implantar a aplicação.' },

            { type: 'subheading', text: 'k8s/deployment.yaml' },
            { type: 'code', language: 'yaml', text:
`apiVersion: apps/v1
kind: Deployment
metadata:
  name: fintech-api-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: fintech-api
  template:
    metadata:
      labels:
        app: fintech-api
    spec:
      containers:
      - name: fintech-api
        image: your-dockerhub-username/fintech-api:latest
        ports:
        - containerPort: 8080
        envFrom:
        - configMapRef:
            name: fintech-api-configmap
        - secretRef:
            name: fintech-api-secret`
            },

            { type: 'subheading', text: 'k8s/service.yaml' },
            { type: 'code', language: 'yaml', text:
`apiVersion: v1
kind: Service
metadata:
  name: fintech-api-service
spec:
  type: LoadBalancer # ou ClusterIP/NodePort dependendo do ambiente
  selector:
    app: fintech-api
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080`
            },

            { type: 'subheading', text: 'k8s/configmap.yaml' },
            { type: 'code', language: 'yaml', text:
`apiVersion: v1
kind: ConfigMap
metadata:
  name: fintech-api-configmap
data:
  REDIS_URL: "redis-service:6379" # Nome do serviço do Redis no K8s
  RABBITMQ_URL: "rabbitmq-service:5672" # Nome do serviço do RabbitMQ no K8s`
            },

            { type: 'subheading', text: 'k8s/secret.yaml' },
            { type: 'paragraph', text: 'Lembre-se de encodar os valores em Base64.' },
            { type: 'code', language: 'yaml', text:
`apiVersion: v1
kind: Secret
metadata:
  name: fintech-api-secret
type: Opaque
data:
  # echo -n 'postgres://user:password@db-service:5432/fintech?sslmode=disable' | base64
  POSTGRES_URL: cG9zdGdyZXM6Ly91c2VyOnBhc3N3b3JkQGRiLXNlcnZpY2U6NTQzMi9maW50ZWNoP3NzbG1vZGU9ZGlzYWJsZQ==`
            },
        ]
    },
    exercicios: {
        title: "Exercícios Práticos",
        content: [
            { type: 'heading', text: 'Lista de Exercícios' },
            { type: 'paragraph', text: 'Resolva estes exercícios para aprofundar seu conhecimento e se preparar para os desafios do projeto.' },
            { type: 'list', items: [
                '**Golang Básico:** Crie uma função que recebe um slice de inteiros e retorna a soma de todos os números pares usando uma goroutine e um channel para o resultado.',
                '**Modelagem de Banco:** Escreva o SQL (DDL) para criar as tabelas `accounts` e `transactions` com os tipos de dados corretos, chaves primárias (UUID) e chaves estrangeiras.',
                '**Docker:** Escreva um `Dockerfile` que compila um "Hello, World" em Go e o executa. A imagem final deve ter menos de 20MB.',
                '**Concorrência:** Modifique o endpoint de transação para que a publicação no RabbitMQ ocorra em uma goroutine separada, para não bloquear a resposta HTTP.',
                '**Testes Unitários:** Escreva um teste unitário para uma função de serviço que valida uma transação (e.g., verifica se a conta de origem tem saldo suficiente), usando mocks para o repositório do banco.',
                '**Mensageria:** Usando a lib oficial do RabbitMQ para Go, escreva um programa simples que publica uma mensagem "Hello, RabbitMQ!" em uma fila e outro programa que a consome.',
                '**Integrações:** Escreva o código Go para se conectar ao Redis, setar uma chave `balance:account_id` com um valor, e depois recuperá-la.',
                '**Kubernetes:** Qual a diferença entre um `Service` do tipo `ClusterIP`, `NodePort` e `LoadBalancer`? Quando usar cada um?',
                '**SQL Avançado:** Escreva uma query SQL que calcule o saldo final de todas as contas em uma única consulta, considerando todas as transações de débito e crédito.',
                '**Testes de Integração:** Configure um teste de integração para o endpoint `POST /accounts` que utiliza `testcontainers-go` para subir um banco PostgreSQL temporário.',
                '**Cloud/AWS Conceitual:** Como você implantaria esta aplicação na AWS usando serviços gerenciados? Descreva quais serviços usaria para cada componente (API, DB, Cache, Fila) e por quê.',
                '**Refatoração:** Imagine que a regra de negócio para transações se tornou complexa. Refatore a lógica do `TransactionService` para usar o padrão `Strategy` para diferentes tipos de transação (e.g., PIX, TED).',
                '**Performance:** O endpoint de saldo está lento. Descreva como você usaria `pprof` para identificar o gargalo de performance no código Go.',
                '**Segurança:** Como você evitaria uma condição de corrida (`race condition`) ao processar múltiplas transações para a mesma conta concorrentemente? Descreva uma estratégia de locking (pessimista ou otimista).',
                '**K8s Avançado:** Crie um manifesto de `HorizontalPodAutoscaler` (HPA) para o seu `Deployment`, configurando-o para escalar horizontalmente com base no uso de CPU.'
            ]},
        ],
    },
    roteiro: {
        title: "Roteiro de Estudos",
        content: [
            { type: 'heading', text: 'Plano de 7 Dias para Dominar o Desafio' },
            { type: 'subheading', text: 'Dia 1: Fundamentos e Setup' },
            { type: 'list', items: [
                'Revisar a sintaxe de Go, com foco em structs, interfaces e error handling.',
                'Estudar o básico de `net/http` e um router como `Chi` ou `Gin`.',
                'Configurar o ambiente de desenvolvimento: Go, Docker, Docker Compose.',
                'Criar a estrutura inicial do projeto e o `docker-compose.yml` básico.'
            ]},
            { type: 'subheading', text: 'Dia 2: Banco de Dados e Migrations' },
            { type: 'list', items: [
                'Estudar a biblioteca `database/sql` e um driver para Postgres (e.g., `pgx`).',
                'Modelar o banco de dados e escrever os DDLs.',
                'Implementar o sistema de migrations (`golang-migrate/migrate`).',
                'Criar a camada de repositório para `accounts`.'
            ]},
            { type: 'subheading', text: 'Dia 3: Core Logic e Contas' },
            { type: 'list', items: [
                'Implementar a camada de serviço e handler para o CRUD de contas.',
                'Escrever os testes unitários para o `AccountService`.',
                'Conectar tudo e testar os endpoints `POST /accounts` e `GET /accounts/{id}`.'
            ]},
            { type: 'subheading', text: 'Dia 4: Transações e Concorrência' },
            { type: 'list', items: [
                'Implementar a lógica de transação, garantindo atomicidade (SQL transactions).',
                'Implementar a camada de serviço e handler para `POST /transactions`.',
                'Estudar goroutines e channels para operações assíncronas.'
            ]},
            { type: 'subheading', text: 'Dia 5: Cache com Redis' },
            { type: 'list', items: [
                'Integrar o cliente Redis na aplicação.',
                'Implementar a lógica de cache para o endpoint de saldo.',
                'Implementar a invalidação do cache após uma nova transação.',
                'Escrever testes para a lógica de cache.'
            ]},
            { type: 'subheading', text: 'Dia 6: Mensageria com RabbitMQ e Testes Finais' },
            { type: 'list', items: [
                'Integrar o cliente RabbitMQ.',
                'Implementar a publicação de eventos de transação.',
                'Finalizar todos os testes unitários e de integração.',
                'Refatorar e limpar o código.'
            ]},
            { type: 'subheading', text: 'Dia 7: Docker, Kubernetes e Documentação' },
            { type: 'list', items: [
                'Finalizar e otimizar o `Dockerfile` com multi-stage builds.',
                'Criar os manifestos do Kubernetes (`Deployment`, `Service`, etc.).',
                'Escrever um `README.md` completo e detalhado.',
                'Subir o projeto para o GitHub.'
            ]},
        ],
    },
    checklist: {
        title: "Checklist de Avaliação",
        content: [
            { type: 'heading', text: 'CHECKLIST.md' },
            { type: 'paragraph', text: 'Use esta lista para autoavaliar a qualidade do seu projeto.' },
            
            { type: 'subheading', text: '✅ Código e Arquitetura' },
            { type: 'list', items: [
                '[ ] A estrutura de pastas segue o padrão "Project Layout"?',
                '[ ] O código está limpo, bem formatado (`gofmt`) e comentado onde necessário?',
                '[ ] As responsabilidades estão bem divididas (handler, service, repository)?',
                '[ ] O tratamento de erros é consistente em toda a aplicação?',
                '[ ] Variáveis de ambiente são usadas para configuração (sem hardcoding)?'
            ]},
            { type: 'subheading', text: '✅ Funcionalidades' },
            { type: 'list', items: [
                '[ ] Todos os 4 endpoints da API foram implementados e funcionam como esperado?',
                '[ ] A criação de transações é atômica?',
                '[ ] O cache de saldo no Redis está funcionando e sendo invalidado corretamente?',
                '[ ] Um evento é publicado no RabbitMQ após cada transação bem-sucedida?'
            ]},
            { type: 'subheading', text: '✅ Testes' },
            { type: 'list', items: [
                '[ ] A cobertura de testes unitários na lógica de negócio é alta?',
                '[ ] Mocks são usados efetivamente para isolar os testes de unidade?',
                '[ ] Existem testes de integração para os endpoints da API?',
                '[ ] Os testes passam de forma consistente (`go test -v ./...`)?'
            ]},
            { type: 'subheading', text: '✅ Infraestrutura' },
            { type: 'list', items: [
                '[ ] O `Dockerfile` utiliza multi-stage build?',
                '[ ] O `docker-compose.yml` sobe todos os serviços necessários sem erros?',
                '[ ] Os manifestos do Kubernetes estão bem formados e completos?',
                '[ ] Segredos (como a connection string do DB) são gerenciados via `Secret` e não `ConfigMap`?'
            ]},
            { type: 'subheading', text: '✅ Documentação' },
            { type: 'list', items: [
                '[ ] O `README.md` é claro e explica como rodar e testar o projeto?',
                '[ ] Os endpoints da API estão documentados com exemplos de request/response?'
            ]},
        ],
    },
    entrevista: {
        title: "Simulação de Entrevista",
        content: [
            { type: 'heading', text: '20 Perguntas Técnicas Avançadas' },
            { type: 'list', items: [
                '**Go:** Qual a diferença entre um `channel` com buffer e um sem buffer? Dê um exemplo de caso de uso para cada um.',
                '**Go:** Explique o que é o `context` em Go e por que ele é crucial em aplicações de rede como uma API REST.',
                '**Go:** O que são `struct tags`? Dê exemplos de uso além da serialização JSON (e.g., ORM, validação).',
                '**Go:** Como o garbage collector do Go funciona em alto nível? Quais foram as principais melhorias nas últimas versões?',
                '**Go:** Descreva um cenário onde você usaria `sync.Mutex` vs. `sync.RWMutex`.',
                '**Fintech:** O que é idempotência e por que ela é fundamental em APIs de pagamento? Como você implementaria uma chave de idempotência no endpoint de transação?',
                '**Fintech:** Explique o conceito de "double-spending" e quais mecanismos (no banco de dados ou na aplicação) você usaria para preveni-lo.',
                '**Arquitetura:** O que é o padrão Saga e como ele poderia ser aplicado neste sistema para gerenciar transações distribuídas complexas?',
                '**Arquitetura:** Quando você escolheria usar gRPC em vez de REST para comunicação entre serviços? Quais as vantagens e desvantagens?',
                '**Banco de Dados:** O que são níveis de isolamento de transação (e.g., Read Committed, Serializable)? Qual você usaria para a operação de transferência de dinheiro e por quê?',
                '**Banco de Dados:** Explique o que é um `deadlock` no banco de dados. Como sua aplicação deveria lidar com um deadlock ao tentar executar uma transação?',
                '**Mensageria:** Qual a diferença entre os padrões "fanout", "direct" e "topic" em um message broker como RabbitMQ?',
                '**Cache:** Descreva diferentes estratégias de cache, como "cache-aside", "read-through" e "write-through". Qual delas foi implementada no desafio?',
                '**Kubernetes:** O que é um `readiness probe` e um `liveness probe`? Por que ambos são importantes para a saúde de uma aplicação no K8s?',
                '**Kubernetes:** Explique o que é `Service Mesh` (e.g., Istio, Linkerd) e quais problemas ele resolve.',
                '**Segurança:** Quais são as vulnerabilidades mais comuns em uma API REST (OWASP Top 10) e como você mitigaria algumas delas em Go?',
                '**Performance:** Se a sua API estivesse recebendo uma carga muito alta, quais seriam os primeiros pontos que você investigaria para otimização, desde a aplicação até a infraestrutura?',
                '**Observabilidade:** Que ferramentas e estratégias você usaria para monitorar esta aplicação em produção (logs, métricas e tracing)?',
                '**Testes:** O que é Test-Driven Development (TDD)? Você acha que seria uma abordagem viável para este projeto? Justifique.',
                '**Cultura:** Descreva uma situação técnica complexa que você enfrentou em um projeto anterior e como você a resolveu.'
            ]},
        ],
    },
};
   