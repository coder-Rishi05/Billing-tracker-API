import { app } from "./src/app.js";
import { port } from "./src/config/constant.js";

import { PORT } from "./src/config/env.js";

import dotenv from "dotenv";
dotenv.config();

app.get("/", (req, res) => {
  res.send("Hi from the server");
});

app.listen(PORT, () => {
  console.log(`server running at ${port}`);
});
