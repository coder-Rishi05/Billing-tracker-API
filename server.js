import { app } from "./src/app.js";
import "dotenv/config";
import { port } from "./src/config/constant.js";
import { PORT } from "./src/config/env.js";
import connectDB from "./src/db/db.js";

app.get("/", (req, res) => {
  res.send("Hi from the server");
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error connecting to server", err);
  });
