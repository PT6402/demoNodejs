import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRoutes from "./controllers/notes";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import { StatusCodes } from "http-status-codes";
import cors from "cors";
import env from "./util/validateEnv";
import mongoose from "mongoose";
// -----------------
const app = express();
const port = env.PORT;
app.use(
  cors({
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
// app.use("/api/notes", notesRoutes);
app.use("/", (req, res, next) => {
  res.status(StatusCodes.OK).json("hellow world");
});
app.use((req, res, next) =>
  next(createHttpError(StatusCodes.NOT_FOUND, "endpoint not found"))
);
app.use(
  (error: unknown, req: Request, res: Response, next: NextFunction): void => {
    console.error(error);
    let errorMessage = "An unknow error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
      statusCode = error.status;
      errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
  }
);

mongoose
  .connect(env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("connection mongodb success!");
    app.listen(port, () => {
      console.log(`server running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));

export default app;
