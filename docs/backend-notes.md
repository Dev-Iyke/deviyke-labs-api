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
- [Prisma Seeding](#prisma-seeding)
- [Projects Content Model](#projects-content-model)
- [Prisma Error Handling](#prisma-error-handling)
- [Deployment](#deployment)
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
For Supabase public-schema tables, we also add RLS inside the same migration when possible:

```sql
ALTER TABLE public."Project" ENABLE ROW LEVEL SECURITY;
```

This keeps the table protected from accidental Supabase Data API exposure, even though the main app flow is:

```text
Frontend -> Nest API -> Prisma -> Supabase Postgres
```

When creating a new app table, the preferred workflow is:

```text
Edit prisma/schema.prisma
Run npx prisma migrate dev --name create_projects --create-only
Open the generated migration.sql
Add the table-specific RLS line
Run npx prisma migrate dev
Run npx prisma generate
```

Do not add `_prisma_migrations` RLS changes inside Prisma migrations. Prisma's shadow database may not have that internal table while replaying migrations.

## Prisma Seeding

A seed script inserts starter data into the database.

For DevIyke Labs, seeds are useful because portfolio content starts from known project/blog/profile records before admin editing exists.

Current seed setup:

```text
prisma/seed.ts
prisma/data/projects.seed.ts
```

`prisma/seed.ts` is the runner. It connects to the database and calls seed functions.

`prisma/data/projects.seed.ts` holds project content.

Prisma v7 seed config lives in `prisma.config.ts`:

```ts
migrations: {
  path: 'prisma/migrations',
  seed: 'tsx prisma/seed.ts',
}
```

We use `tsx` instead of `ts-node` because the generated Prisma v7 TypeScript client works better with this project's modern Node/TypeScript module setup.

The seed uses `upsert`:

```ts
await prisma.project.upsert({
  where: { slug: project.slug },
  update: project,
  create: project,
});
```

Practical meaning:

```text
If the slug exists -> update the existing row
If the slug does not exist -> create a new row
```

That makes seeds safe to run multiple times while we refine the project content.

Run seeds with:

```text
npx prisma db seed
```

Current package script:

```text
npm run db:seed
```

Before admin exists, seed files are the source of truth for portfolio content.

Practical rule:

```text
Before admin -> seed files own content
After admin -> database/admin UI owns content
```

Direct database edits through Supabase Table Editor or pgAdmin can be useful for quick experiments, but final intended content changes should go back into seed files so dev and prod can be recreated consistently.

Example:

```text
Change featured projects in prisma/data/projects.seed.ts
Run npm run db:seed against dev
Run npm run db:seed against prod when intentionally updating production content
```

For the Projects seed, `featuredProjectSlugs` controls both which projects are featured and the homepage featured order. The individual frontend `featured` values are not the final authority once the backend seed mapping derives featured state from that slug list.

Seed data can transform frontend-friendly values into database enum values.

Example:

```ts
'active-build' -> ProjectEvidenceStatus.ACTIVE_BUILD
'backend-foundation' -> ProjectImpactArea.BACKEND_FOUNDATION
```

This is normal backend mapping: the original content shape and the database shape do not have to be identical.

## Projects Content Model

The Projects feature starts as one `Project` table.

This is a v1 choice to avoid over-normalizing before admin exists.

Instead of creating many related tables immediately, repeatable nested content is stored in JSON fields:

```text
stack
highlights
links
surfaces
features
outcomes
talkingPoints
decisions
challenges
nextSteps
```

JSON can still hold structured data.

Example `features` value:

```json
[
  {
    "name": "JWT authentication and protected access",
    "roles": ["Users"],
    "description": "Users can move through account-aware flows.",
    "engineering": "JWT-based authentication and protected route handling."
  }
]
```

Important tradeoff:

- JSON keeps v1 simple and close to the frontend shape.
- JSON does not deeply enforce nested object structure at the database level.
- Later admin workflows may justify normalizing some JSON fields into related tables.

Fields that deserve direct columns now:

```text
slug
title
kicker
summary
heroImageSrc
heroImageAlt
evidenceStatus
role
timeframe
projectType
featured
featuredOrder
displayOrder
problem
approach
outcome
backendNote
privacyNote
createdAt
updatedAt
```

`slug` is unique because it is the public lookup key for routes such as:

```text
/work/mini-mart
GET /api/v1/projects/mini-mart
```

`featured`, `featuredOrder`, and `displayOrder` let the backend own project ordering.

Practical examples:

```text
Homepage selected work -> featured=true ordered by featuredOrder
Work index page -> all projects ordered by displayOrder
```

Prisma indexes support common lookup/sort patterns:

```prisma
@@index([featured, featuredOrder])
@@index([displayOrder])
@@index([evidenceStatus])
```

An index is like a shortcut the database keeps for common questions.

Example:

```ts
await prisma.project.findMany({
  where: { featured: true },
  orderBy: { featuredOrder: 'asc' },
});
```

The `@@index([featured, featuredOrder])` index helps this kind of query.

Images are stored as strings for v1:

```text
heroImageSrc="/projects/noonprep/noonprep-landing-banner.png"
heroImageAlt="NoonPrep landing page preview"
```

The backend stores the path. The frontend still serves the actual file from its public assets.

Cloudinary or Supabase Storage becomes important later when admin users need to upload/manage images.

Enums are controlled lists:

```prisma
enum ProjectEvidenceStatus {
  SHIPPED
  ACTIVE_BUILD
  EXPERIMENT
}
```

Adding enum values later is allowed through a new migration. Renaming or removing enum values needs more care because existing rows may already use the old value.

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
## Deployment

The production backend is deployed as a Render Web Service.

Current production URL:

```text
https://deviyke-labs-api.onrender.com
```

Important routes:

```text
GET  /api/v1
GET  /api/docs
POST /api/v1/contact-submissions
```

Deployment architecture:

```text
portfolio-web -> Render NestJS API -> Prisma -> Supabase Postgres prod database
```

Production database decision:

```text
deviyke-labs-dev  -> local/development DATABASE_URL
deviyke-labs-prod -> Render/production DATABASE_URL
```

The production database is not copied from the dev database. It is built by applying the committed Prisma migration files to the prod database.

Practical mental model:

```text
prisma/schema.prisma = current desired database shape
prisma/migrations/ = step-by-step history for building that shape
dev Supabase DB = one database that has applied those steps
prod Supabase DB = another database that applies those same steps
```

Render build/start configuration:

```text
Build Command:
npm install --include=dev && npm run build

Start Command:
npm run db:migrate:deploy && npm run start:prod

Health Check Path:
/api/v1
```

Why build uses `--include=dev`:

- `nest build` needs `@nestjs/cli`, which currently lives in `devDependencies`.
- Prisma generation/build tooling also runs during build.
- Render may otherwise install production dependencies only, causing errors like `nest: not found`.

Why we currently use `npm install` instead of `npm ci` on Render:

- `npm ci` is stricter and failed when the lockfile did not match the dependency tree Render expected.
- `npm install --include=dev` got the deployment unstuck while still installing the tools needed for build.
- Later, we can clean the lockfile and return to `npm ci --include=dev` for stricter reproducible installs.

Production scripts:

```json
{
  "prisma:generate": "prisma generate",
  "build": "npm run prisma:generate && nest build",
  "db:migrate:deploy": "prisma migrate deploy",
  "start:prod": "node dist/src/main"
}
```

Why `start:prod` uses `dist/src/main`:

- Nest currently emits the compiled entry file at `dist/src/main.js`.
- `node dist/main` failed on Render because that file did not exist.

Why migrations run in the start command:

- Render Free does not provide a Pre-Deploy Command.
- The start command first applies pending migrations, then starts the compiled app.
- `prisma migrate deploy` is safe for production because it only applies committed migration files and does not create new migrations.

Deployment logs should show:

```text
Generated Prisma Client
Build successful
No pending migrations to apply
Nest application successfully started
Mapped {/api/v1/contact-submissions, POST} route
```

Render environment variables:

```text
DATABASE_URL=prod Supabase session-pooler URL
CORS_ORIGINS=https://frontend-domain.com,http://localhost:3000,http://localhost:3001
NODE_ENV=production
```

Do not manually set `PORT` unless the platform requires it. Render provides a `PORT`, and the app already reads `process.env.PORT` through `ConfigService`.

CORS note:

`CORS_ORIGINS` should contain frontend origins, not backend API URLs.

Correct examples:

```text
https://deviyke-labs.vercel.app
http://localhost:3000
http://localhost:3001
```

Wrong example:

```text
https://deviyke-labs-api.onrender.com/api/v1/contact-submissions
```

Supabase production project security setup:

- Use the Session pooler connection string for `DATABASE_URL`.
- Disable automatically exposing new tables if possible.
- Enable automatic RLS as a safety net.
- Still keep explicit RLS lines in migrations for app tables so the security state is visible in Git.

Current RLS migration rule:

```text
App tables -> RLS through Prisma migration files
Prisma internal tables -> optional one-time SQL Editor fix, not Prisma migrations
```

Example future table migration:

```sql
-- Prisma generates the CREATE TABLE statement.
CREATE TABLE "Project" (...);

-- We manually add the RLS line before applying the migration.
ALTER TABLE public."Project" ENABLE ROW LEVEL SECURITY;
```

Node version note:

Render currently defaults new Node services to a recent Node version, but defaults can change over time. Render supports pinning Node through the `NODE_VERSION` env var, `.node-version`, `.nvmrc`, or `package.json` `engines`. For stability, we should pin an LTS version before relying on this deployment long-term.

Render docs:

```text
https://render.com/docs/node-version
https://render.com/docs/web-services
https://render.com/docs/environment-variables
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






