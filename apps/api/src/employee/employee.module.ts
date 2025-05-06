import { forwardRef, Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { PrismaModule } from '../common/prisma/prisma.module';
import { EmployeeTrpcRouter } from './employee.router';
import { TrpcModule } from '../common/trpc/trpc.module';

@Module({
  imports: [PrismaModule, forwardRef(() => TrpcModule)],
  providers: [EmployeeService, EmployeeTrpcRouter],
  exports: [EmployeeTrpcRouter],
})
export class EmployeeModule {}
