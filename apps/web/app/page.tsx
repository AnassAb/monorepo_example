import { ClientEmployeeList } from "./_component-examples/client-employee-list";
import { EmployeeForm } from "./_component-examples/employee-form";
import ServerEmployeeList from "./_component-examples/server-employee-list";

export default async function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-blue-200">
        Hello world!
      </h1>
      <EmployeeForm />
      <ServerEmployeeList />
      <ClientEmployeeList />
    </div>
  );
}
