import "zod-openapi/extend";
import { z } from "zod";
export declare const EmployeeSchema: z.ZodObject<
  {
    id: z.ZodNumber;
    firstName: z.ZodString;
    lastName: z.ZodString;
    currentAddress: z.ZodString;
    email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
  },
  "strip",
  z.ZodTypeAny,
  {
    id: number;
    firstName: string;
    lastName: string;
    currentAddress: string;
    createdAt: Date;
    email?: string | null | undefined;
    updatedAt?: Date | null | undefined;
  },
  {
    id: number;
    firstName: string;
    lastName: string;
    currentAddress: string;
    createdAt: Date;
    email?: string | null | undefined;
    updatedAt?: Date | null | undefined;
  }
>;
export type EmployeeType = z.infer<typeof EmployeeSchema>;
export declare const EmployeeCreateSchema: z.ZodObject<
  Omit<
    {
      id: z.ZodNumber;
      firstName: z.ZodString;
      lastName: z.ZodString;
      currentAddress: z.ZodString;
      email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
      createdAt: z.ZodDate;
      updatedAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    },
    "id" | "createdAt" | "updatedAt"
  >,
  "strip",
  z.ZodTypeAny,
  {
    firstName: string;
    lastName: string;
    currentAddress: string;
    email?: string | null | undefined;
  },
  {
    firstName: string;
    lastName: string;
    currentAddress: string;
    email?: string | null | undefined;
  }
>;
export type EmployeeCreateType = z.infer<typeof EmployeeCreateSchema>;
export declare const EmployeeUpdateSchema: z.ZodObject<
  {
    id: z.ZodNumber;
    data: z.ZodObject<
      {
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
        currentAddress: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
      },
      "strip",
      z.ZodTypeAny,
      {
        firstName?: string | undefined;
        lastName?: string | undefined;
        currentAddress?: string | undefined;
        email?: string | null | undefined;
      },
      {
        firstName?: string | undefined;
        lastName?: string | undefined;
        currentAddress?: string | undefined;
        email?: string | null | undefined;
      }
    >;
  },
  "strip",
  z.ZodTypeAny,
  {
    id: number;
    data: {
      firstName?: string | undefined;
      lastName?: string | undefined;
      currentAddress?: string | undefined;
      email?: string | null | undefined;
    };
  },
  {
    id: number;
    data: {
      firstName?: string | undefined;
      lastName?: string | undefined;
      currentAddress?: string | undefined;
      email?: string | null | undefined;
    };
  }
>;
export type EmployeeUpdateType = z.infer<typeof EmployeeUpdateSchema>;
//# sourceMappingURL=employee.type.d.ts.map
