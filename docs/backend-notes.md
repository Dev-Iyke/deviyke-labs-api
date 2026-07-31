# DevIyke Labs API Backend Notes

These notes explain the backend setup as we build it. The goal is to keep source code comments focused and use this file for learning context, decisions, and practical examples.

## Table Of Contents

- [Project Shape](#project-shape)
- [Initial NestJS Structure](#initial-nestjs-structure)
- [NestJS Modules And Providers](#nestjs-modules-and-providers)
- [Environment Configuration](#environment-configuration)
- [API Bootstrap](#api-bootstrap)
- [Database Direction](#database-direction)
- [Prisma ORM](#prisma-orm)
- [Prisma In NestJS](#prisma-in-nestjs)
- [Prisma Migration Workflow](#prisma-migration-workflow)
- [Prisma Error Handling](#prisma-error-handling)
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

## NestJS Modules And Providers

NestJS is module-based. A module groups related pieces of the application and tells Nest how they fit together.

Common Nest building blocks:

```text
@Module()      -> groups imports, controllers, and providers
@Controller()  -> receives HTTP requests and returns responses
@Injectable()  -> marks a class as something Nest can create and inject
```

A provider is usually a service class. Providers hold reusable logic and can be injected into controllers or other services.

Practical example:

```ts
@Injectable()
export class AppService {
  getHello() {
    return 'Hello World!';
  }
}
```

Registering it in a module:

```ts
@Module({
  providers: [AppService],
})
export class AppModule {}
```

Now Nest knows how to create `AppService`.

A controller can receive the service through its constructor:

```ts
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
```

Nest sees the constructor dependency and injects an `AppService` instance. This is dependency injection.

`imports` means this module needs another module's exported providers.

`providers` means this module creates/manages these services.

`exports` means other modules that import this module may use these providers.

Core rule:

```text
A module can inject providers it owns, plus providers exported by modules it imports.
```

Practical example:

```ts
@Module({
  imports: [PrismaModule],
  controllers: [ContactSubmissionsController],
  providers: [ContactSubmissionsService],
})
export class ContactSubmissionsModule {}
```

`ContactSubmissionsModule` owns `ContactSubmissionsService`, so its controller and providers can inject that service.

It imports `PrismaModule`, so its providers can inject anything `PrismaModule` exports, such as `PrismaService`.

Because `ContactSubmissionsModule` does not export `ContactSubmissionsService`, other modules cannot inject `ContactSubmissionsService` yet. If another module later needs it, then `ContactSubmissionsModule` must add:

```ts
exports: [ContactSubmissionsService]
```

Then the other module must import `ContactSubmissionsModule`.

`controllers` means these classes expose HTTP routes. Infrastructure modules, such as `PrismaModule`, usually do not have controllers because they do not receive HTTP requests directly.

Import style decision:

- Use relative imports for nearby local files, such as `./prisma.service`.
- Use package imports for dependencies, such as `@nestjs/common`.
- Use path aliases only after intentionally configuring them in TypeScript and the test/build tooling.

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
@prisma/adapter-pg
pg
dotenv
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

`pg` is the PostgreSQL driver for Node.js.

`@prisma/adapter-pg` lets Prisma Client use the `pg` driver in Prisma v7's SQL workflow.

Practical mental model:

```text
Nest service -> Prisma Client -> @prisma/adapter-pg -> pg -> Supabase Postgres
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

## Prisma In NestJS

We created a shared Prisma layer:

```text
src/prisma/prisma.module.ts
src/prisma/prisma.service.ts
```

`PrismaService` extends `PrismaClient`:

```ts
export class PrismaService extends PrismaClient {}
```

That means `PrismaService` inherits Prisma Client methods such as:

```ts
this.prisma.contactSubmission.create(...)
this.prisma.contactSubmission.findMany(...)
```

`@Injectable()` marks `PrismaService` as a provider Nest can create and inject.

`PrismaModule` registers and exports the service:

```ts
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

A feature module can import `PrismaModule`, then its service can inject `PrismaService`:

```ts
constructor(private readonly prisma: PrismaService) {}
```

This keeps one shared database access layer instead of each feature manually creating its own Prisma Client.

## Prisma Migration Workflow

When we change the database shape, the usual development flow is:

```text
Edit prisma/schema.prisma
Run npx prisma format
Run npx prisma validate
Run npx prisma migrate dev --name descriptive_migration_name
Run npx prisma generate when the app needs the updated TypeScript client
Write or update NestJS business logic
Commit schema + migration files
```

`npx prisma format` formats only Prisma schema files. The project's `npm run format` script currently formats TypeScript files in `src/` and `test/`, so it does not touch `prisma/schema.prisma`.

`npx prisma validate` checks that Prisma can read the schema/config and that the schema syntax is valid. It does not create tables.

`npx prisma migrate dev --name create_contact_submissions` means:

```text
Use Prisma's development migration workflow
Name the generated migration create_contact_submissions
Create a SQL migration file
Apply it to the database in DATABASE_URL
Record it in the _prisma_migrations table
```

The word `dev` in `migrate dev` does not mean the database must be named `dev`. It means this command is intended for development because it can create migrations, apply them immediately, detect drift, and prompt for resets if needed.

The actual database target always comes from `DATABASE_URL`.

Practical example:

```text
Local .env DATABASE_URL -> deviyke-labs-dev Supabase project
Production DATABASE_URL -> deviyke-labs-prod Supabase project
```

For production or deployment, we do not use `migrate dev`. We use:

```text
npx prisma migrate deploy
```

`migrate deploy` applies existing migration files from `prisma/migrations/` to the production database. It does not create new migrations and is designed for CI/CD or deployment platforms.

Typical production flow later:

```text
Developer creates migration locally with migrate dev
Migration files are committed to Git
Backend deploy starts on Railway/Render/etc.
Deploy process runs npx prisma migrate deploy against the production DATABASE_URL
App starts using the migrated database
```

The first contact migration created:

```text
prisma/migrations/20260729152952_create_contact_submissions/migration.sql
```

That SQL creates the `ContactSubmission` table in Postgres.

## Prisma Error Handling

Prisma schema changes, client generation, and database migrations are separate steps.

Practical example:

```prisma
model ContactSubmission {
  email String @unique
}
```

Adding `@unique` to `schema.prisma` and running these commands is not enough to change the real database:

```text
npx prisma validate
npx prisma generate
```

`validate` checks the schema shape. `generate` updates the TypeScript Prisma Client. To apply the unique constraint to the database, we need a migration:

```text
npx prisma migrate dev --name add_unique_contact_submission_email
```

If a unique constraint exists and Prisma tries to create a duplicate row, Prisma throws a known request error with code `P2002`.

A service can translate that database error into a clearer HTTP response:

```ts
try {
  const submission = await this.prisma.contactSubmission.create({ data });
  return successResponse('Contact submission received', {
    id: submission.id,
    createdAt: submission.createdAt,
  });
} catch (error) {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2002'
  ) {
    throw new ConflictException(
      'A contact submission with this email already exists',
    );
  }

  throw error;
}
```

That returns an HTTP `409 Conflict` instead of an unclear server error.

Current contact decision:

- `email` is not unique for contact submissions.
- The same recruiter/client may contact more than once.
- Duplicate submissions are allowed.
- Spam prevention should be handled later with rate limiting, honeypot fields, CAPTCHA/Turnstile, or admin review rather than a unique email constraint.

Nest already handles validation errors from DTOs through the global `ValidationPipe`.

Example response when the frontend sends an unknown field such as `source`:

```json
{
  "message": ["property source should not exist"],
  "error": "Bad Request",
  "statusCode": 400
}
```

Frontend handling can use the first message or map through all messages.

Current response strategy:

```text
Success responses -> small successResponse helper
Validation and framework errors -> Nest default error responses
Prisma/domain-specific errors -> catch in the service only when we intentionally need a clearer HTTP exception
```
## Branching Checkpoints

After the NestJS foundation was pushed, we added the database foundation on the setup branch:

```text
prisma
@prisma/client
dotenv
prisma/schema.prisma
prisma.config.ts
```

This is a clean checkpoint before feature work because Prisma is installed, initialized, and validated, but no business tables have been added yet.

Recommended branch flow:

```text
app-setup -> commit database foundation -> push -> create feature/contact-submissions
```

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


