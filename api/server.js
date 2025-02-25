const express = require("express");
const router = require("./routers/authRouter");

const app = express();
const port = 8001;

app.get("/", (req, res) => {
  res.end("hello");
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
