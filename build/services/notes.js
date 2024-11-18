"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeNote = exports.updateNote = exports.createNote = exports.getNote = exports.getNotes = void 0;
var http_status_codes_1 = require("http-status-codes");
var http_errors_1 = __importDefault(require("http-errors"));
var note_1 = __importDefault(require("../models/note"));
var mongoose_1 = __importDefault(require("mongoose"));
var getNotes = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var notes, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, note_1.default.find().exec()];
            case 1:
                notes = _a.sent();
                res.status(200).json(notes);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getNotes = getNotes;
var getNote = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var noteId, note, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                noteId = req.params.noteId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                if (!mongoose_1.default.isValidObjectId(noteId)) {
                    throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid note id");
                }
                return [4 /*yield*/, note_1.default.findById(noteId).exec()];
            case 2:
                note = _a.sent();
                if (!note)
                    throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "note not found by id ".concat(noteId));
                res.status(http_status_codes_1.StatusCodes.OK).json(note);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getNote = getNote;
var createNote = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var title, text, newNote, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                title = req.body.title;
                text = req.body.text;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                if (!title)
                    throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "note must have a title");
                return [4 /*yield*/, note_1.default.create({ title: title, text: text })];
            case 2:
                newNote = _a.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json(newNote);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createNote = createNote;
var updateNote = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var noteId, newTitle, newText, note, updateNote_1, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                noteId = req.params.noteId;
                newTitle = req.body.title;
                newText = req.body.text;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                if (!mongoose_1.default.isValidObjectId(noteId)) {
                    throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid note id ");
                }
                if (!newTitle) {
                    throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Note must have a title");
                }
                return [4 /*yield*/, note_1.default.findById(noteId).exec()];
            case 2:
                note = _a.sent();
                if (!note) {
                    throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND);
                }
                note.title = newTitle;
                note.text = newText;
                return [4 /*yield*/, note.save()];
            case 3:
                updateNote_1 = _a.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json(updateNote_1);
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateNote = updateNote;
var removeNote = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var noteId, note, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                noteId = req.params.noteId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                if (!mongoose_1.default.isValidObjectId(noteId)) {
                    throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "note id invalid");
                }
                return [4 /*yield*/, note_1.default.findById(noteId).exec()];
            case 2:
                note = _a.sent();
                if (!note) {
                    throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "note not found");
                }
                return [4 /*yield*/, note_1.default.findByIdAndDelete(noteId).exec()];
            case 3:
                _a.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json("remove success");
                return [3 /*break*/, 5];
            case 4:
                error_5 = _a.sent();
                next(error_5);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.removeNote = removeNote;
