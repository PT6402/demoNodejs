import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;
app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
mongoose
  .connect(env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("connection mongodb success!");
  })
  .catch((error) => console.log(error));
