# Migué

Aplicação para registro e acompanhamento de atividades profissionais: cadastro de projetos, atividades com status/duração, e consulta flexível via OData.

Monorepo com backend (.NET), web (React) e mobile (Expo). Especificação completa em [`docs/spec.md`](docs/spec.md); decisões de arquitetura e trade-offs em [`docs/decisions.md`](docs/decisions.md).

## Estrutura

```
apps/
├── backend/   # ASP.NET Core Web API (.NET 10) + SQLite
├── web/       # React + TypeScript + Vite
└── mobile/    # React Native + Expo + TypeScript

packages/      # reservado para código compartilhado futuro (vazio por enquanto)
docs/          # spec, decisões de arquitetura
```

## Tecnologias

- **Backend:** .NET 10, ASP.NET Core Web API, Entity Framework Core, SQLite, Microsoft.AspNetCore.OData, FluentValidation, AutoMapper, JWT Bearer, Swagger, xUnit.
- **Web:** React, TypeScript, Vite.
- **Mobile:** React Native, Expo, TypeScript.

## Requisitos

- .NET 10 SDK
- Node.js 18+ e npm

## Backend

```bash
cd apps/backend
dotnet restore
```

Configurar o segredo do JWT localmente (nunca versionado — ver `docs/spec.md` item 35):

```bash
cd src/Migue.Api
dotnet user-secrets set "Jwt:Secret" "<uma-string-aleatoria-de-pelo-menos-32-caracteres>"
```

Aplicar as migrations (cria `migue.db` via SQLite):

```bash
dotnet tool install --global dotnet-ef   # se ainda não tiver
cd apps/backend
dotnet ef database update --project src/Migue.Infrastructure --startup-project src/Migue.Api
```

Rodar a API:

```bash
cd apps/backend/src/Migue.Api
dotnet run
```

> Se `dotnet run`/o `.exe` gerado falhar com "não é um aplicativo válido para esta plataforma de SO" (comum em máquinas corporativas com Defender/ASR bloqueando executáveis novos), rode via `dotnet bin/Debug/net10.0/Migue.Api.dll` em vez do apphost nativo.

Swagger UI (ambiente Development): `http://localhost:5127/swagger` (porta padrão de `launchSettings.json`).

Exemplos de consulta OData:

```
GET /odata/Activities?$filter=Status eq 'Completed'
GET /odata/Activities?$orderby=CreatedAt desc
GET /odata/Activities?$expand=Project&$select=Id,Title,Status
GET /odata/Activities?$top=20&$skip=40
```

Rodar os testes:

```bash
cd apps/backend
dotnet test
```

## Web

```bash
cd apps/web
npm install
cp .env.example .env.local   # ajustar VITE_API_URL se necessário
npm run dev
```

## Mobile

```bash
cd apps/mobile
npm install
npx expo start
```
