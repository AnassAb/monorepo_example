# Monorepo Example

This repository demonstrates a modern [Turborepo](https://turborepo.com/) monorepo setup with full-stack TypeScript, Prisma, Next.js, and shared tooling.

---

## 🚀 Getting Started

Clone the repo and install dependencies:

```sh
git clone <your-repo-url>
cd monorepo_example
npm install
```

---

## ⚙️ Environment Variables

### API App (`apps/api`)

Create a file at `apps/api/.env` with the following variables:

```env
DATABASE_URL=your_postgres_connection_string
PORT=8080 [or whatever port you want]
```

- `DATABASE_URL`: Your PostgreSQL connection string for Prisma.
- `PORT`: The port your API server will run on (default: 8080).

### Web App (`apps/web`)

Create a file at `apps/web/.env` with the following variable:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

- `NEXT_PUBLIC_API_URL`: The URL where your API server is running.

---

## 🗄️ Database Setup

1. Copy your `.env` file as shown above and set your `DATABASE_URL`.
2. Generate the Prisma client:

```sh
npx prisma migrate dev --name "your_migration_name" [this will migrate your db and generate a prisma client for you]
```

---

## 🧑‍💻 Development

To start all apps and packages in development mode:

```sh
npm run dev
```

---

## 🏗️ Project Structure

```
apps/
  api/        # NestJS + tRPC + Prisma API
  web/        # Next.js frontend
packages/
  types/             # Shared TypeScript types and Zod schemas
  eslint-config/     # Shared ESLint config
  typescript-config/ # Shared tsconfig.json
```

---

## 🛠️ Tooling

- **TypeScript** for static type checking
- **ESLint** for code linting
- **Prettier** for code formatting
- **Prisma** for database ORM
- **tRPC** for end-to-end typesafe APIs
- **Zod** for runtime validation
- **zod-openapi** for generating OpenAPI schemas from Zod
- **trpc-to-openapi** for generating OpenAPI docs from tRPC routers
- **Tailwind CSS** for utility-first styling in the frontend
- **shadcn/ui** for accessible, customizable React UI components

---

## 🧩 Useful Scripts

| Script                | Description                       |
| --------------------- | --------------------------------- |
| `npm run dev`         | Run all apps/packages in dev mode |
| `npm run build`       | Build all apps/packages           |
| `npm run lint`        | Lint all code                     |
| `npm run format`      | Format all code with Prettier     |
| `npm run generate`    | Generate Prisma client            |
| `npm run check-types` | Type-check all packages           |

---

## 📚 Resources

- [Turborepo Docs](https://turborepo.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [NestJS Docs](https://docs.nestjs.com/)
- [Prisma Docs](https://www.prisma.io/docs/)
- [tRPC Docs](https://trpc.io/docs)
- [Zod Docs](https://zod.dev/)

---

## 📝 License

MIT
