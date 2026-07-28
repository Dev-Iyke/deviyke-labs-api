# DevIyke Labs API Backend Notes

These notes explain the backend setup as we build it. The goal is to keep source code comments focused and use this file for learning context, decisions, and practical examples.

## Table Of Contents

- [Project Shape](#project-shape)
- [Initial NestJS Structure](#initial-nestjs-structure)
- [Environment Configuration](#environment-configuration)
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

Examples of environment variables this API will eventually need:

```text
PORT=5500
DATABASE_URL=postgresql://...
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

Current decision:

- Use `.env.example` to document required environment variables.
- Ignore real `.env` files so secrets do not get committed.
- Use port `5500` for the backend because the frontend often uses `3000`.

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
