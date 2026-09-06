"use client";

import { useEffect, useState } from "react";
import type { TodoItem } from "@/lib/data";

export default function TodoItemsPage() {
  const [todos, setTodos] = useState<TodoItem[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/todo-items")
      .then((res) => res.json())
      .then((data: TodoItem[]) => setTodos(data))
      .catch(() => setError(true));
  }, []);

  return (
    <main className="container">
      <nav>
        <a href="/">Home</a> · <a href="/users">Users</a>
      </nav>
      <h1>Todo Items</h1>
      <p>
        Data loaded from <code>/api/todo-items</code>
      </p>
      <ul className="list">
        {error && <li>Failed to load todo items.</li>}
        {!error && !todos && <li>Loading…</li>}
        {todos?.map((todo) => (
          <li key={todo.id} className={todo.completed ? "done" : undefined}>
            <strong>{todo.title}</strong>
            <br />
            <span>
              {todo.completed ? "Completed" : "Pending"} · user #{todo.userId}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
