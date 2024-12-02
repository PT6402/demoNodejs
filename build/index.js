"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const http_errors_1 = require("http-errors");
const http_status_codes_1 = require("http-status-codes");
const cors_1 = __importDefault(require("cors"));
const validateEnv_1 = __importDefault(require("./util/validateEnv"));
// -----------------
const app = (0, express_1.default)();
const port = validateEnv_1.default.PORT;
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
// app.use("/api/notes", notesRoutes);
app.use("/", (req, res, next) => {
    res.status(http_status_codes_1.StatusCodes.OK).json("hellow world");
});
// app.use((req, res, next) =>
//   next(createHttpError(StatusCodes.NOT_FOUND, "endpoint not found"))
// );
app.use((error, req, res, next) => {
    console.error(error);
    let errorMessage = "An unknow error occurred";
    let statusCode = 500;
    if ((0, http_errors_1.isHttpError)(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});
app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
});
// mongoose
//   .connect(env.MONGODB_CONNECTION_STRING)
//   .then(() => {
//     console.log("connection mongodb success!");
//   })
//   .catch((error) => console.log(error));
exports.default = app;
