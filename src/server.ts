import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;
mongoose
  .connect(env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("connection mongodb success!");
    app.listen(port, () => {
      console.log(`server running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
