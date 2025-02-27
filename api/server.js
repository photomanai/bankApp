const express = require("express");
const db = require("./models/db");
const router = require("./routers/routerManager");
const cors = require("cors");

const app = express();
const port = 8001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.end("hello");
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
