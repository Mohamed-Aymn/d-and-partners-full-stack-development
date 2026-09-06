"use client";

import { useEffect, useState } from "react";
import type { User } from "@/lib/data";

export default function UsersPage() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data: User[]) => setUsers(data))
      .catch(() => setError(true));
  }, []);

  return (
    <main className="container">
      <nav>
        <a href="/">Home</a> · <a href="/todo-items">Todo Items</a>
      </nav>
      <h1>Users</h1>
      <p>
        Data loaded from <code>/api/users</code>
      </p>
      <ul className="list">
        {error && <li>Failed to load users.</li>}
        {!error && !users && <li>Loading…</li>}
        {users?.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong>
            <br />
            <span>{user.email}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
