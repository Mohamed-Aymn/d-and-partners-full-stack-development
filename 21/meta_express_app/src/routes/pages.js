const express = require("express");
const path = require("path");

const router = express.Router();
const viewsDir = path.join(__dirname, "../../views");

router.get("/users", (_req, res) => {
  res.sendFile(path.join(viewsDir, "users.html"));
});

router.get("/todo-items", (_req, res) => {
  res.sendFile(path.join(viewsDir, "todo-items.html"));
});

module.exports = router;
