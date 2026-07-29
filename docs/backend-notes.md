# DevIyke Labs API Backend Notes

These notes explain the backend setup as we build it. The goal is to keep source code comments focused and use this file for learning context, decisions, and practical examples.

## Table Of Contents

- [Project Shape](#project-shape)
- [Initial NestJS Structure](#initial-nestjs-structure)
- [Environment Configuration](#environment-configuration)
- [API Bootstrap](#api-bootstrap)
- [Database Direction](#database-direction)
- [Prisma ORM](#prisma-orm)
- [Branching Checkpoints](#branching-checkpoints)
- [Global Validation](#global-validation)
  - [`whitelist: true`](#whitelist-true)
  - [`forbidNonWhitelisted: true`](#forbidnonwhitelisted-true)
  - [`transform: true`](#transform-true)

## Project Shape

Repository name: `deviyke-labs-api`

This backend starts as a modular monolith.

A modular monolith means the app is deployed as one backend application, but the code is organized into clear feature modules. For this project, future modules may include `projects`, `blogs`, `profile`, `recruiter-brief`, and `contact`.

Why this is a good v1 choice:

- It is simpler to build and deploy than microservices.
- It still teaches clean backend boundaries.
- It keeps future admin integration possible without adding too much complexity early.

## Initial NestJS Structure

`src/main.ts` is the entry point. It creates the Nest app and starts the HTTP server.

`src/app.module.ts` is the root module. It wires top-level imports, controllers, and providers together.

`src/app.controller.ts` receives HTTP requests. The starter app currently handles `GET /`.

`src/app.service.ts` contains logic used by the controller. The starter app currently returns `Hello World!`.

Request flow in the starter app:

```text
GET / -> AppController -> AppService -> "Hello World!"
```

## Environment Configuration

We installed `@nestjs/config` so the app can read environment variables in a Nest-friendly way.

Current environment variables:

```text
PORT=4800
CORS_ORIGINS=http://localhost:3000,http://localhost:3001,https://deviyke-labs.vercel.app
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/postgres"
```

Current decisions:

- Use `.env` for real local values.
- Use `.env.example` to document required variables with safe examples/placeholders.
- Ignore real `.env` files so secrets do not get committed.
- Use port `4800` for the backend because frontend dev servers often use `3000` or `3001`.
- Store multiple CORS origins as a comma-separated string.

Practical CORS example:

```text
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

The app parses that string into:

```ts
['http://localhost:3000', 'http://localhost:3001']
```

This lets both frontend dev servers call the backend.

## API Bootstrap

The app currently uses a global route prefix:

```text
/api/v1
```

So the starter route is:

```text
GET /api/v1
```

Swagger is available outside the versioned API prefix at:

```text
/api/docs
```

Why use `/api/v1`:

- It gives the frontend a stable API contract.
- It keeps future breaking changes possible without immediately removing v1.
- New features do not automatically require v2. A new API version is mainly for breaking request or response changes.

Practical versioning example:

```text
GET /api/v1/projects
GET /api/v2/projects
```

Both can exist at the same time while the frontend gradually migrates.

## Database Direction

We are using Supabase to host the PostgreSQL database for now.

Current architecture:

```text
portfolio-web -> deviyke-labs-api -> Prisma -> Supabase Postgres
```

The frontend should not talk directly to Supabase for this backend-owned content. The NestJS API stays responsible for business rules and response shapes.

Database naming decision:

```text
deviyke-labs-dev
deviyke-labs-prod
```

Why keep dev and prod separate:

- Dev data can be fake, reset, or migrated often.
- Production data should stay stable for the live portfolio.
- The same backend code can use different `DATABASE_URL` values per environment.

Supabase connection decision for local development:

- Use the Session pooler connection string for Prisma/local app traffic.
- It is IPv4-friendly and ends with port `5432`.
- Avoid the Transaction pooler for now because it is better suited to serverless/short-lived connections.
- Avoid putting the real connection string in Git.

`.env` example locally:

```text
DATABASE_URL="real-session-pooler-url"
```

`.env.example` placeholder:

```text
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/postgres"
```

## Prisma ORM

We installed:

```text
prisma
@prisma/client
```

`prisma` is the CLI/tooling package. It gives us commands such as:

```text
npx prisma init
npx prisma validate
npx prisma migrate dev
npx prisma generate
npx prisma studio
```

`@prisma/client` is the runtime package the NestJS app uses to query the database from TypeScript.

Practical mental model:

```text
Nest service -> Prisma Client -> Supabase Postgres
```

Prisma v7 initialization created:

```text
prisma/schema.prisma
prisma.config.ts
```

`prisma/schema.prisma` is where we define database models.

`prisma.config.ts` tells the Prisma CLI where the schema and migrations live, and how to read `DATABASE_URL`.

Prisma also generated AI-tool skill folders:

```text
.agents/
.claude/
.windsurf/
skills-lock.json
```

Those are useful for local tooling, but they are not part of the backend application source code, so we ignore them in Git.

The generated Prisma Client output is also ignored:

```text
generated/
```

That folder can be recreated with:

```text
npx prisma generate
```

Why generated code is ignored:

- It can be recreated from `prisma/schema.prisma`.
- It prevents noisy commits.
- It keeps the schema as the source of truth.

## Branching Checkpoints

After the NestJS foundation was pushed, we added the database foundation on the setup branch:

`	ext
prisma
@prisma/client
dotenv
prisma/schema.prisma
prisma.config.ts
` 

This is a clean checkpoint before feature work because Prisma is installed, initialized, and validated, but no business tables have been added yet.

Recommended branch flow:

`	ext
app-setup -> commit database foundation -> push -> create feature/contact-submissions
` 

Why feature branches help:

- Foundation changes stay easy to review.
- Contact-specific schema, migration, DTO, controller, and service work stays grouped together.
- If the contact feature needs adjustment, it does not muddy the setup checkpoint.

## Global Validation

We installed:

```text
class-validator
class-transformer
```

`class-validator` lets DTO classes define validation rules, such as valid email or non-empty string.

`class-transformer` helps Nest transform plain JSON request data into DTO class instances and convert values where we explicitly ask it to.

The global validation pipe lives in `src/main.ts`.

Recommended config:

```ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);
```

### `whitelist: true`

This removes fields that are not allowed by the DTO.

Example contact DTO fields:

```text
name
email
message
```

Incoming request:

```json
{
  "name": "Ada",
  "email": "ada@example.com",
  "message": "Hello",
  "isAdmin": true
}
```

With `whitelist: true`, `isAdmin` is removed before the request reaches business logic.

### `forbidNonWhitelisted: true`

This rejects requests that include fields not allowed by the DTO.

Using the same request above, the API returns `400 Bad Request` because `isAdmin` should not exist.

Why we prefer this for DevIyke Labs API:

- Frontend mistakes are caught quickly.
- Public endpoints are stricter.
- API contracts are clearer.
- Suspicious extra fields do not silently pass through.

### `transform: true`

This allows Nest to transform incoming request data based on DTO classes.

Practical example:

```http
GET /projects?limit=6&featured=true
```

Query values arrive as strings:

```json
{
  "limit": "6",
  "featured": "true"
}
```

Later, with DTO decorators, we can convert `limit` into a number and `featured` into a boolean so service logic does not need to parse strings everywhere.


