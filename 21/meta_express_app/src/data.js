const users = [
  { id: 1, name: "Ada Lovelace", email: "ada@example.com" },
  { id: 2, name: "Grace Hopper", email: "grace@example.com" },
  { id: 3, name: "Alan Turing", email: "alan@example.com" },
];

const todoItems = [
  { id: 1, title: "Set up Express routes", completed: true, userId: 1 },
  { id: 2, title: "Serve HTML pages", completed: true, userId: 1 },
  { id: 3, title: "Add sample data", completed: false, userId: 2 },
  { id: 4, title: "Write API docs", completed: false, userId: 3 },
];

module.exports = { users, todoItems };
