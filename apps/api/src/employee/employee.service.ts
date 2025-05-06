/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { EmployeeCreateType, EmployeeUpdateType } from '@repo/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(employeeData: EmployeeCreateType) {
    try {
      return await this.prisma.employee.create({
        data: employeeData,
      });
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const target = error.meta?.target
            ? `: ${JSON.stringify(error.meta.target)}`
            : '';
          throw new Error(`Employee already exists: duplicated ${target}`);
        }
      }

      throw new Error('Unexpected error while creating employee');
    }
  }

  async findAll() {
    try {
      const employees = await this.prisma.employee.findMany();
      if (!employees || employees.length === 0) {
        throw new Error('Employees not found');
      }
      return employees;
    } catch (error: any) {
      throw new Error('Unexpected error while fetching employees: ');
    }
  }

  async findOne(id: number) {
    try {
      const employee = await this.prisma.employee.findUnique({ where: { id } });
      if (!employee) {
        throw new Error('Employee not found');
      }
      return employee;
    } catch (error: any) {
      throw new Error('Unexpected error while fetching employee');
    }
  }

  async update(
    id: EmployeeUpdateType['id'],
    updateEmployeeData: EmployeeUpdateType['data'],
  ) {
    try {
      const employee = await this.prisma.employee.update({
        where: { id },
        data: updateEmployeeData,
      });
      return employee;
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Employee not found');
        }
        if (error.code === 'P2002') {
          const target = error.meta?.target
            ? `: ${JSON.stringify(error.meta.target)}`
            : '';
          throw new Error(`Employee update failed, duplicate field${target}`);
        }
      }
      throw new Error('Unexpected error while updating employee');
    }
  }

  async remove(id: number) {
    try {
      const employee = await this.prisma.employee.delete({
        where: { id },
      });
      return employee;
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Employee not found');
        }
      }
      throw new Error('Unexpected error while deleting employee');
    }
  }
}
