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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeNote = exports.updateNote = exports.createNote = exports.getNote = exports.getNotes = void 0;
const http_status_codes_1 = require("http-status-codes");
const http_errors_1 = __importDefault(require("http-errors"));
const note_1 = __importDefault(require("../models/note"));
const mongoose_1 = __importDefault(require("mongoose"));
const getNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield note_1.default.find().exec();
        res.status(200).json(notes);
    }
    catch (error) {
        next(error);
    }
});
exports.getNotes = getNotes;
const getNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const noteId = req.params.noteId;
    try {
        if (!mongoose_1.default.isValidObjectId(noteId)) {
            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid note id");
        }
        const note = yield note_1.default.findById(noteId).exec();
        if (!note)
            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `note not found by id ${noteId}`);
        res.status(http_status_codes_1.StatusCodes.OK).json(note);
    }
    catch (error) {
        next(error);
    }
});
exports.getNote = getNote;
const createNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const text = req.body.text;
    try {
        if (!title)
            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "note must have a title");
        const newNote = yield note_1.default.create({ title, text });
        res.status(http_status_codes_1.StatusCodes.OK).json(newNote);
    }
    catch (error) {
        next(error);
    }
});
exports.createNote = createNote;
const updateNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;
    try {
        if (!mongoose_1.default.isValidObjectId(noteId)) {
            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid note id ");
        }
        if (!newTitle) {
            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Note must have a title");
        }
        const note = yield note_1.default.findById(noteId).exec();
        if (!note) {
            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        note.title = newTitle;
        note.text = newText;
        const updateNote = yield note.save();
        res.status(http_status_codes_1.StatusCodes.OK).json(updateNote);
    }
    catch (error) {
        next(error);
    }
});
exports.updateNote = updateNote;
const removeNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const noteId = req.params.noteId;
    try {
        if (!mongoose_1.default.isValidObjectId(noteId)) {
            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "note id invalid");
        }
        const note = yield note_1.default.findById(noteId).exec();
        if (!note) {
            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "note not found");
        }
        yield note_1.default.findByIdAndDelete(noteId).exec();
        res.status(http_status_codes_1.StatusCodes.OK).json("remove success");
    }
    catch (error) {
        next(error);
    }
});
exports.removeNote = removeNote;
