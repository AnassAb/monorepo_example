import "zod-openapi/extend";
import { z } from "zod";

// Employee Zod Schema
export const EmployeeSchema = z
  .object({
    id: z.number().int().nonnegative().openapi({ example: 1 }),
    firstName: z.string().openapi({ example: "John" }),
    lastName: z.string().openapi({ example: "Doe" }),
    currentAddress: z.string().openapi({ example: "123 Main St" }),
    email: z
      .string()
      .email()
      .nullable()
      .optional()
      .openapi({ example: "john.doe@example.com" }),
    createdAt: z.date().openapi({ example: "2024-01-01T00:00:00.000Z" }),
    updatedAt: z
      .date()
      .nullable()
      .optional()
      .openapi({ example: "2024-01-02T00:00:00.000Z" }),
  })
  .openapi({ title: "Employee" });

export type EmployeeType = z.infer<typeof EmployeeSchema>;

// Create Schema (omit id, createdAt, updatedAt)
export const EmployeeCreateSchema = EmployeeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).openapi({ title: "EmployeeCreate" });

export type EmployeeCreateType = z.infer<typeof EmployeeCreateSchema>;

// Update Schema
export const EmployeeUpdateSchema = z
  .object({
    id: EmployeeSchema.shape.id,
    data: EmployeeCreateSchema.partial(),
  })
  .openapi({ title: "EmployeeUpdate" });

export type EmployeeUpdateType = z.infer<typeof EmployeeUpdateSchema>;
