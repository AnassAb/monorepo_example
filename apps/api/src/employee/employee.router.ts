import { Injectable, Logger } from '@nestjs/common';
import { z } from 'zod';
import 'zod-openapi/extend';
import { TrpcService } from '../common/trpc/trpc.service';
import { EmployeeService } from './employee.service';
import {
  EmployeeCreateSchema,
  EmployeeUpdateSchema,
  EmployeeSchema,
} from '@repo/types';
import { TRPCError } from '@trpc/server';

/**
 * This function defines the tRPC router for employee-related operations.
 * It includes methods for creating, listing, getting, updating, and deleting employees.
 *
 * @param {TrpcService} t - The tRPC service instance.
 * @param {EmployeeService} employeeService - The employee service instance.
 * @returns {EmployeeRouterType} - The configured tRPC router for employee operations.
 */
export const employeeRouter = (
  t: TrpcService,
  employeeService: EmployeeService,
) =>
  t.router({
    create: t.procedure
      .meta({
        openapi: { method: 'POST', path: '/api/trpc/employee.create' },
      })
      .input(EmployeeCreateSchema)
      .output(EmployeeSchema)
      .mutation(async ({ input }) => {
        Logger.log(
          `Creating employee: ${JSON.stringify(input)}`,
          'EmployeeTrpcRouter',
        );
        try {
          return await employeeService.create(input);
        } catch (error) {
          Logger.error(
            'Failed to create employee',
            error instanceof Error ? error.stack : undefined,
            'EmployeeTrpcRouter',
          );
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to create employee',
            cause: error,
          });
        }
      }),

    list: t.procedure
      .meta({ openapi: { method: 'GET', path: '/api/trpc/employee.list' } })
      .input(z.object({}).optional())
      .output(z.array(EmployeeSchema))
      .query(async () => {
        Logger.log('Listing all employees', 'EmployeeTrpcRouter');
        try {
          return await employeeService.findAll();
        } catch (error) {
          Logger.error(
            'Failed to list employees',
            error instanceof Error ? error.stack : undefined,
            'EmployeeTrpcRouter',
          );
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'No employees found',
            cause: error,
          });
        }
      }),

    get: t.procedure
      .meta({ openapi: { method: 'GET', path: '/api/trpc/employee.get' } })
      .input(z.object({ id: z.number() }))
      .output(EmployeeSchema)
      .query(async ({ input }) => {
        Logger.log(
          `Getting employee with id: ${input.id}`,
          'EmployeeTrpcRouter',
        );
        try {
          return await employeeService.findOne(input.id);
        } catch (error) {
          Logger.error(
            `Failed to get employee with id: ${input.id}`,
            error instanceof Error ? error.stack : undefined,
            'EmployeeTrpcRouter',
          );
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Employee not found',
            cause: error,
          });
        }
      }),

    update: t.procedure
      .meta({ openapi: { method: 'PUT', path: '/api/trpc/employee.update' } })
      .input(EmployeeUpdateSchema)
      .output(EmployeeSchema)
      .mutation(async ({ input }) => {
        Logger.log(
          `Updating employee with id: ${input.id}, data: ${JSON.stringify(input.data)}`,
          'EmployeeTrpcRouter',
        );
        try {
          return await employeeService.update(input.id, input.data);
        } catch (error) {
          Logger.error(
            `Failed to update employee with id: ${input.id}`,
            error instanceof Error ? error.stack : undefined,
            'EmployeeTrpcRouter',
          );
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Employee not found or update failed',
            cause: error,
          });
        }
      }),

    delete: t.procedure
      .meta({
        openapi: { method: 'DELETE', path: '/api/trpc/employee.delete' },
      })
      .input(z.object({ id: z.number() }))
      .output(EmployeeSchema)
      .mutation(async ({ input }) => {
        Logger.log(
          `Deleting employee with id: ${input.id}`,
          'EmployeeTrpcRouter',
        );
        try {
          return await employeeService.remove(input.id);
        } catch (error) {
          Logger.error(
            `Failed to delete employee with id: ${input.id}`,
            error instanceof Error ? error.stack : undefined,
            'EmployeeTrpcRouter',
          );
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Employee not found or delete failed',
            cause: error,
          });
        }
      }),
  });

export type EmployeeRouterType = ReturnType<typeof employeeRouter>;

@Injectable()
export class EmployeeTrpcRouter {
  public readonly router: EmployeeRouterType;

  constructor(
    private readonly trpc: TrpcService,
    private readonly employeeService: EmployeeService,
  ) {
    this.router = employeeRouter(this.trpc, this.employeeService);
  }
}
