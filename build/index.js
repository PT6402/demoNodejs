"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const notes_1 = __importDefault(require("./controllers/notes"));
const morgan_1 = __importDefault(require("morgan"));
const http_errors_1 = __importStar(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const cors_1 = __importDefault(require("cors"));
const validateEnv_1 = __importDefault(require("./util/validateEnv"));
const mongoose_1 = __importDefault(require("mongoose"));
// -----------------
const app = (0, express_1.default)();
const port = validateEnv_1.default.PORT;
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use("/api/notes", notes_1.default);
// app.use("/", (req, res, next) => {
//   res.status(StatusCodes.OK).json("hellow world");
// });
app.use((req, res, next) => next((0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "endpoint not found")));
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
mongoose_1.default
    .connect(validateEnv_1.default.MONGODB_CONNECTION_STRING)
    .then(() => {
    console.log("connection mongodb success!");
    app.listen(port, () => {
        console.log(`server running on http://localhost:${port}`);
    });
})
    .catch((error) => console.log(error));
exports.default = app;
