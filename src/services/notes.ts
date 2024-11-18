import { StatusCodes } from "http-status-codes";
import createHttpError from "http-errors";
import { NextFunction, Request, RequestHandler, Response } from "express";
import NoteModel from "../models/note";
import mongoose from "mongoose";
export const getNotes: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};
export const getNote: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const noteId = req.params.noteId;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(StatusCodes.BAD_REQUEST, "Invalid note id");
    }
    const note = await NoteModel.findById(noteId).exec();
    if (!note)
      throw createHttpError(
        StatusCodes.NOT_FOUND,
        `note not found by id ${noteId}`
      );
    res.status(StatusCodes.OK).json(note);
  } catch (error) {
    next(error);
  }
};
interface CreateNoteBody {
  title?: string;
  text?: string;
}
export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req: Request, res: Response, next: NextFunction) => {
  const title = req.body.title;
  const text = req.body.text;
  try {
    if (!title)
      throw createHttpError(StatusCodes.BAD_REQUEST, "note must have a title");

    const newNote = await NoteModel.create({ title, text });
    res.status(StatusCodes.OK).json(newNote);
  } catch (error) {
    next(error);
  }
};
interface UpdateNoteParams {
  noteId?: string;
}
interface UpdateNoteBody {
  title?: string;
  text?: string;
}
export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req: Request, res: Response, next: NextFunction) => {
  const noteId = req.params.noteId;
  const newTitle = req.body.title;
  const newText = req.body.text;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(StatusCodes.BAD_REQUEST, "Invalid note id ");
    }
    if (!newTitle) {
      throw createHttpError(StatusCodes.BAD_REQUEST, "Note must have a title");
    }
    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(StatusCodes.NOT_FOUND);
    }
    note.title = newTitle;
    note.text = newText;
    const updateNote = await note.save();
    res.status(StatusCodes.OK).json(updateNote);
  } catch (error) {
    next(error);
  }
};

export const removeNote: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const noteId = req.params.noteId;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(StatusCodes.BAD_REQUEST, "note id invalid");
    }
    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(StatusCodes.NOT_FOUND, "note not found");
    }

    await NoteModel.findByIdAndDelete(noteId).exec();
    res.status(StatusCodes.OK).json("remove success");
  } catch (error) {
    next(error);
  }
};
