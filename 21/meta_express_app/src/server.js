const express = require("express");
const path = require("path");
const apiRoutes = require("./routes/api");
const pageRoutes = require("./routes/pages");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

app.use("/api", apiRoutes);
app.use(pageRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
