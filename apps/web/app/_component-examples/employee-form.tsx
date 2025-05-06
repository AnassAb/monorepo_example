"use client";

import { useState } from "react";
import { trpc } from "../../trpc/client";
import type { EmployeeCreateType } from "@repo/types";

const initialForm: Partial<EmployeeCreateType> = {
  firstName: "",
  lastName: "",
  currentAddress: "",
  email: "",
};

export function EmployeeForm() {
  const [form, setForm] = useState<Partial<EmployeeCreateType>>(initialForm);
  const [message, setMessage] = useState<string | null>(null);

  const utils = trpc.useUtils();
  const createEmployee = trpc.employee.create.useMutation({
    onSuccess: () => {
      setMessage("Employee created!");
      setForm(initialForm);
      utils.employee.list.invalidate();
    },
    onError: (err) => {
      setMessage(err.message);
    },
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value, type } = e.target;
    const target = e.target as HTMLInputElement; // Cast to access checked property
    const newValue = type === "checkbox" ? target.checked : value;

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Convert birthDate to Date if needed
    const payload = {
      ...form,
    } as EmployeeCreateType;
    createEmployee.mutate(payload);
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <h2>Create Employee</h2>
      <input
        name="firstName"
        placeholder="First Name"
        value={form.firstName}
        onChange={handleChange}
        required
      />
      <input
        name="lastName"
        placeholder="Last Name"
        value={form.lastName}
        onChange={handleChange}
        required
      />
      <input
        name="currentAddress"
        placeholder="Current Address"
        value={form.currentAddress}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email ?? ""}
        onChange={handleChange}
        type="email"
      />
      <button type="submit" disabled={createEmployee.isPending}>
        {createEmployee.isPending ? "Creating..." : "Create"}
      </button>
      {message && <div>{message}</div>}
    </form>
  );
}
