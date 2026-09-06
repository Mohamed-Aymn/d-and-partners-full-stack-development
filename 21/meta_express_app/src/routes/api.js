const express = require("express");
const { users, todoItems } = require("../data");

const router = express.Router();

router.get("/users", (_req, res) => {
  res.json(users);
});

router.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

router.get("/todo-items", (_req, res) => {
  res.json(todoItems);
});

router.get("/todo-items/:id", (req, res) => {
  const item = todoItems.find((t) => t.id === Number(req.params.id));
  if (!item) {
    return res.status(404).json({ error: "Todo item not found" });
  }
  res.json(item);
});

module.exports = router;
