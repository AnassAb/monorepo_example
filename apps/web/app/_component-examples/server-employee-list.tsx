import { trpcServerClient } from "../../trpc/server";

export default async function ServerEmployeeList() {
  const employees = await trpcServerClient.employee.list.query();

  return (
    <div>
      <h1>Server Employee List</h1>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.firstName} {employee.lastName}
          </li>
        ))}
      </ul>
      <p>Count: {employees.length}</p>
      <p>Server Time: {new Date().toLocaleTimeString()}</p>
      <p>Client Time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}
