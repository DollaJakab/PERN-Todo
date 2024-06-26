const express = require("express");
const cors = require("cors");
const app = express();
const todosRouter = require("./routes/todosRoute");
const jwtAuthRouter = require("./routes/jwtAuth");

//* MIDDLEWARE
app.use(cors());
app.use(express.json());
//* ROUTES
app.use("/todos", todosRouter);
app.use("/auth", jwtAuthRouter);

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
