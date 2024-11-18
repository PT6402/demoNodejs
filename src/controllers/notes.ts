import express from "express";
import * as NotesController from "../services/notes";
const router = express.Router();
router.get("/", NotesController.getNotes);
router.get("/:noteId", NotesController.getNote);
router.post("/", NotesController.createNote);
router.put("/:noteId", NotesController.updateNote);
router.delete("/:noteId", NotesController.removeNote);
export default router;
