"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var validateEnv_1 = __importDefault(require("./util/validateEnv"));
var mongoose_1 = __importDefault(require("mongoose"));
var port = validateEnv_1.default.PORT;
mongoose_1.default
    .connect(validateEnv_1.default.MONGODB_CONNECTION_STRING)
    .then(function () {
    console.log("connection mongodb success!");
    app_1.default.listen(port, function () {
        console.log("server running on http://localhost:".concat(port));
    });
})
    .catch(function (error) { return console.log(error); });
