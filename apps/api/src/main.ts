import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TrpcRouter } from './common/trpc/trpc.router';
import { generateOpenApiDocument } from 'trpc-to-openapi';
import { SwaggerModule } from '@nestjs/swagger';
import 'zod-openapi/extend';
import type { OpenAPIObject } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const trpc = app.get(TrpcRouter);

  const baseUrl =
    process.env.BASE_URL ||
    (process.env.RAILWAY_PUBLIC_DOMAIN &&
      `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`) ||
    `http://localhost:${process.env.PORT ?? 4000}`;

  const openApiDocument = generateOpenApiDocument(trpc.appRouter, {
    title: 'tRPC OpenAPI: OptiFarm API',
    description: 'tRPC API for OptiFarm: Farm Management System',
    version: '1.0.0',
    baseUrl,
  });
  if (!openApiDocument.paths) {
    openApiDocument.paths = {};
  }
  SwaggerModule.setup(
    '/api/trpc',
    app,
    openApiDocument as unknown as OpenAPIObject,
  );

  trpc.applyMiddleware(app);
  const port = process.env.PORT ?? 4000;
  await app.listen(port);

  Logger.log(`🚀 API is listening on ${baseUrl} (port ${port})`, 'Bootstrap');
}

bootstrap().catch((err) => {
  Logger.error('Failed to bootstrap application', err);
  process.exit(1);
});
