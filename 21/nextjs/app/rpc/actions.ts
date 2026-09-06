"use server";

import { users, todoItems, User, TodoItem } from "@/lib/data";

export async function getUsers() {
  return users as User[];
}
export async function getUserById(id: number) {
  return users.find((u) => u.id === id) ?? null as User | null;
}
export async function getTodoItems() {
  return todoItems as TodoItem[];
}
export async function getTodoItemById(id: number) {
  return todoItems.find((t) => t.id === id) ?? null as TodoItem | null;
}