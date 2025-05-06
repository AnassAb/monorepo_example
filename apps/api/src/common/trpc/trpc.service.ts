import { Injectable } from '@nestjs/common';
import { initTRPC } from '@trpc/server';
import { OpenApiMeta } from 'trpc-to-openapi';

@Injectable()
export class TrpcService {
  t = initTRPC.meta<OpenApiMeta>().create();

  router = this.t.router;
  procedure = this.t.procedure;

  mergeRouters = this.t.mergeRouters;
}
