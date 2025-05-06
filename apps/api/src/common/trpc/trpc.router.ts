import { INestApplication, Injectable } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import * as trpcExpress from '@trpc/server/adapters/express';
import { EmployeeTrpcRouter } from '../../employee/employee.router';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly employee: EmployeeTrpcRouter,
  ) {}

  get appRouter() {
    return this.trpc.router({
      employee: this.employee.router,
    });
  }

  applyMiddleware(app: INestApplication) {
    app.use(
      `/api/trpc`,
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
      }),
    );
  }
}

export type AppRouter = typeof TrpcRouter.prototype.appRouter;
