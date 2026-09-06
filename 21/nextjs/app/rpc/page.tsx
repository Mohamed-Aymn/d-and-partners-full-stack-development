import { User } from "@/lib/data";
import { getUsers } from "./actions";

async function page() {
  const users = await getUsers();

  return (
    <main className="container">
      <h1>Users list</h1>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>
            User Name: {user.name}
          </li>
        ))}
      </ul>
    </main>
  )
}

export default page