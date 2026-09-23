# migué

> **entregou ou deu migué?**

O migué existe pra você não descobrir na reunião de review aquilo que dava pra ter descoberto semanas antes. A ideia é simples: **antecipar o feedback** em vez de esperar alguém te dar. Você se avalia, o sistema te devolve um retrato sem rodeio do que você manda bem e de onde você escorrega — e aí é contigo.

Monorepo com backend (.NET), web (React) e mobile (Expo).

---

## O que já tem aqui

- **Login com JWT.** Sessão expirou? O app te manda de volta pro `/login` sozinho, sem drama.
- **Autoavaliação de soft skills** (`/softSkills/form`) — nota de 1 a 5 em cada soft skill, salva no banco com histórico. O relatório com estrelinhas fica em `/dashboard/competency`.
- **Questionário situacional de comportamento** (`/dashboard/behavior`) — 72 situações do dia a dia, 24 competências. **Salva a cada clique**, então pode fechar a aba no meio que nada se perde. Rascunho → Enviado, e dá pra abrir uma nova rodada quando quiser.
- **"Onde eu dou migué"** (`/dashboard/behavior/report`) — o relatório do questionário. Nota geral, o que melhorar (com a resposta que você deu *versus* a mais madura), padrões que se repetem e até **como você estava no dia em que respondeu**. Sim, ele sabe se você tava estressado. Mais sobre isso [aqui embaixo](#como-o-relatório-sabe-que-você-tava-estressado).
- **CRUD de usuários** (`/users`) — construído em cima de uma base genérica de CRUD que serve pros próximos.

---

## Stack

| Onde | O quê |
|---|---|
| **Backend** | .NET 10, ASP.NET Core Web API, EF Core + SQLite, FluentValidation, AutoMapper, JWT Bearer, Swagger |
| **Web** | React 19, TypeScript, Vite, Chakra UI v3, TanStack Router / Query / Store |
| **Mobile** | React Native, Expo, TypeScript |

## Estrutura

```
apps/
├── backend/Migue/
│   ├── Migue.Api/              # controllers, middlewares, JWT, Program.cs
│   ├── Migue.Domain/           # entidades, enums, interfaces de repositório
│   ├── Migue.Domain.AppService/# services, DTOs, validators, mappings, textos do relatório
│   ├── Migue.Domain.Data/      # DbContext, configurations, repositórios, migrations, seed
│   └── Migue.IoC/              # injeção de dependência
├── web/src/
│   ├── api/                    # client HTTP + um arquivo por recurso
│   ├── components/crud/        # a base genérica de CRUD
│   ├── hooks/                  # hooks de React Query por recurso
│   ├── pages/                  # uma pasta por tela
│   └── store/                  # auth (TanStack Store)
└── mobile/                     # app Expo

packages/                       # reservado pra código compartilhado (vazio por enquanto)
```

---

## Rodando na sua máquina

### Pré-requisitos

- .NET 10 SDK
- Node.js 18+ e npm
- `dotnet-ef` pra mexer em migration: `dotnet tool install --global dotnet-ef`

### 1. Backend

```bash
cd apps/backend/Migue
dotnet dev-certs https --trust        # uma vez só, pro navegador não chiar com o HTTPS
dotnet ef database update --project Migue.Domain.Data --startup-project Migue.Api
dotnet run --project Migue.Api --launch-profile https
```

Sobe em `https://localhost:7115` (e `http://localhost:5271`). Swagger em `https://localhost:7115/swagger`.

**Use o `--launch-profile https`.** Sem ele o `dotnet run` pega o perfil `http`, sobe só na 5271, e o front — que chama a 7115 — fica falando sozinho.

Em Development, o **seeder** roda na subida da API e cria as competências, as perguntas, o gabarito do questionário, as soft skills e um usuário de desenvolvimento (e-mail e senha em `Migue.Domain.Data/DbSeeder.cs`).

> O banco é um `migue.db` (SQLite) dentro de `Migue.Api/`. Quer começar do zero? Para a API, apaga o arquivo e roda o `database update` de novo.

### 2. Web

```bash
cd apps/web
npm install
cp .env.example .env      # VITE_API_URL=https://localhost:7115
npm run dev
```

Abre em `http://localhost:5173`. Sem login, você cai no `/login`.

### 3. Mobile

```bash
cd apps/mobile
npm install
npx expo start
```

> ⚠️ **Aviso honesto:** o mobile ainda aponta pra API antiga (`http://localhost:5127/api` no `app.json`) e não acompanhou as mudanças recentes. Tá lá, mas não espera muita coisa dele por enquanto.

---

## Migrations

```bash
cd apps/backend/Migue
dotnet ef migrations add NomeDaMigration --project Migue.Domain.Data --startup-project Migue.Api
dotnet ef database update --project Migue.Domain.Data --startup-project Migue.Api
```

**Pegadinha clássica:** com a API rodando, o build falha porque as DLLs de `bin/Debug` estão travadas. Ou você para a API, ou usa outra pasta de saída:

```bash
dotnet ef migrations add NomeDaMigration --project Migue.Domain.Data --startup-project Migue.Api --configuration Release
```

E rode o `database update` **de dentro de `Migue.Api/`** (com `--project ../Migue.Domain.Data --startup-project .`), porque o caminho do banco é relativo (`Data Source=migue.db`). Senão ele cria um banco novo no lugar errado e você fica sem entender por que nada mudou.

---

## Como o código é organizado (e por quê)

### Backend

- **Controller → Service → Repository.** Controller só recebe e devolve; regra fica no service; query fica no repositório.
- **Service devolve DTO de resposta, nunca entidade.** As interfaces dos services moram em `Migue.Domain.AppService`.
- **CRUD padrão sai de graça** do `ServiceBase` + `RepositoryBase`: `GET /X/paged`, `GET/PUT/DELETE /X/{id}`, `POST /X`.
- **Validação** com FluentValidation. Erro vira `400` com os erros por campo (`ValidationExceptionMiddleware`) — e o front já sabe pendurar cada mensagem no campo certo.
- **Coisa "do usuário logado"** (minhas respostas, meu relatório) fica no controller do próprio recurso, em rotas `.../me`, e o id sai do token com `User.GetUserId()`.

### Web — fazendo um CRUD novo em 3 passos

A base genérica está em `src/components/crud/` e `src/hooks/useCrud.ts`. Pra um recurso que segue o padrão do backend:

1. **API:** `export const fooApi = createCrudApi<FooDto, FooRequest>('Foo')`
2. **Config:** um `CrudConfig` com colunas, campos (com validação), `toForm` e `toRequest` — veja `pages/UsersPage/userCrudConfig.tsx`.
3. **Telas:** `<CrudPage config={...} />` pra listagem e `<CrudFormPage config={...} />` pra criar/editar, com as rotas `/foo`, `/foo/new` e `/foo/$id`.

Paginação, dialog de exclusão, loading, erro da API por campo e cache já vêm prontos. Quer o formulário num dialog em vez de página? Não passa `onCreate`/`onEdit` pro `CrudPage`.

### Web — outras coisas que valem saber

- **Tudo passa pelo `apiFetch`** (`src/api/client.ts`): ele manda o token, traduz erro de validação e, se uma chamada autenticada voltar `401`, derruba a sessão, limpa o cache e te leva pro `/login`.
- **Rotas autenticadas** ficam debaixo de um layout sem path que exige login e desenha o menu. Rota nova que precisa de login? Pendura nele.
- **Autosave do questionário** manda uma resposta por vez, em fila (`scope` do React Query), pra clique rápido não chegar fora de ordem.

---

## Como o relatório sabe que você tava estressado

Um avaliador experiente olha pras respostas e fala *"você tava estressado no dia"*. Parece mágica, mas é padrão. O migué faz a mesma coisa — e **mostra as evidências**, pra não ficar no achismo:

1. **Gabarito.** Cada alternativa tem um **peso de 1 a 4** (4 = entende antes de agir, comunica, ajusta; 1 = o reflexo mais fraco) e às vezes um **sinal**: impulsivo, defensivo, passivo, cabeça dura, resolve calado, engole e segue, bateria baixa, pavio curto. Tá tudo em `Migue.Domain.Data/SeedData/CompetencyOptionScoreSeedData.cs`.
2. **Sinais de pressão.** Quantas respostas têm cara de quem tá sob pressão, e como você foi nas perguntas de Inteligência Emocional e Resiliência.
3. **Como você preencheu.** Como cada clique é salvo com horário, dá pra ver resposta rápida demais pra ter sido lida (< 4s), pausas, se foi de madrugada e quantas vezes você mudou de ideia.

Isso vira um termômetro — **Tranquilo, Tenso, Estressado, No limite** — com a lista do que levou à conclusão. A conta está em `CompetencyReportService.cs` e os textos em `Reports/CompetencyReportTexts.cs`.

> É uma leitura das suas respostas, não um diagnóstico. Os pesos e limites são critério do projeto, não ciência validada — discordou de algum? Muda o gabarito e o relatório inteiro acompanha.

---

## Pegadinhas conhecidas

- **Chave do JWT** em `appsettings.json` é só pra desenvolvimento (o nome dela já avisa). Nada de subir isso pra produção.
- **`RepositoryBase.AddRangeAsync` não marca `Active = true`.** O que for criado por ele some das consultas. Os services novos setam na mão; o ideal é corrigir no base.
- **Máquina corporativa com Defender/ASR** pode bloquear o `.exe` gerado ("não é um aplicativo válido para esta plataforma"). Roda com `dotnet bin/Debug/net10.0/Migue.Api.dll`.
- **Mobile desatualizado** — ver aviso lá em cima.

---

Achou migué no código? Abre uma issue. Ou melhor: abre o PR. 😉
