"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeUpdateSchema = exports.EmployeeCreateSchema = exports.EmployeeSchema = void 0;
require("zod-openapi/extend");
const zod_1 = require("zod");
// Employee Zod Schema
exports.EmployeeSchema = zod_1.z
    .object({
    id: zod_1.z.number().int().nonnegative().openapi({ example: 1 }),
    firstName: zod_1.z.string().openapi({ example: "John" }),
    lastName: zod_1.z.string().openapi({ example: "Doe" }),
    currentAddress: zod_1.z.string().openapi({ example: "123 Main St" }),
    email: zod_1.z
        .string()
        .email()
        .nullable()
        .optional()
        .openapi({ example: "john.doe@example.com" }),
    createdAt: zod_1.z.date().openapi({ example: "2024-01-01T00:00:00.000Z" }),
    updatedAt: zod_1.z
        .date()
        .nullable()
        .optional()
        .openapi({ example: "2024-01-02T00:00:00.000Z" }),
})
    .openapi({ title: "Employee" });
// Create Schema (omit id, createdAt, updatedAt)
exports.EmployeeCreateSchema = exports.EmployeeSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
}).openapi({ title: "EmployeeCreate" });
// Update Schema
exports.EmployeeUpdateSchema = zod_1.z
    .object({
    id: exports.EmployeeSchema.shape.id,
    data: exports.EmployeeCreateSchema.partial(),
})
    .openapi({ title: "EmployeeUpdate" });
