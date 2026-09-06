export type User = {
  id: number;
  name: string;
  email: string;
};

export type TodoItem = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export const users: User[] = [
  { id: 1, name: "Ada Lovelace", email: "ada@example.com" },
  { id: 2, name: "Grace Hopper", email: "grace@example.com" },
  { id: 3, name: "Alan Turing", email: "alan@example.com" },
];

export const todoItems: TodoItem[] = [
  { id: 1, title: "Set up Express routes", completed: true, userId: 1 },
  { id: 2, title: "Serve HTML pages", completed: true, userId: 1 },
  { id: 3, title: "Add sample data", completed: false, userId: 2 },
  { id: 4, title: "Write API docs", completed: false, userId: 3 },
];
