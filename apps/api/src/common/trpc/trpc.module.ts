import { forwardRef, Module } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { TrpcRouter } from './trpc.router';
import { EmployeeModule } from '../../employee/employee.module';

@Module({
  imports: [forwardRef(() => EmployeeModule)],
  providers: [TrpcService, TrpcRouter],
  exports: [TrpcRouter, TrpcService],
})
export class TrpcModule {}
