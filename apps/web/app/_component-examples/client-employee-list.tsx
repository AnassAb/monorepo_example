"use client";
// <-- hooks can only be used in client components

import { trpc } from "../../trpc/client";

export function ClientEmployeeList() {
  const employees = trpc.employee.list.useQuery();

  if (!employees.data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Client Greeting</h1>
      <ul>
        {employees.data.map((employee) => (
          <li key={employee.id}>
            {employee.firstName} {employee.lastName}
          </li>
        ))}
      </ul>
      <p>Count: {employees.data.length}</p>
      <p>Server Time: {new Date().toLocaleTimeString()}</p>
      <p>Client Time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}
