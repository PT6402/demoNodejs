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
var express_1 = __importDefault(require("express"));
var notes_1 = __importDefault(require("./controllers/notes"));
var morgan_1 = __importDefault(require("morgan"));
var http_errors_1 = __importStar(require("http-errors"));
var http_status_codes_1 = require("http-status-codes");
var cors_1 = __importDefault(require("cors"));
// -----------------
require("./server");
// -----------------
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use("/api/notes", notes_1.default);
app.use(function (req, res, next) {
    return next((0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "endpoint not found"));
});
app.use(function (error, req, res, next) {
    console.error(error);
    var errorMessage = "An unknow error occurred";
    var statusCode = 500;
    if ((0, http_errors_1.isHttpError)(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});
exports.default = app;
