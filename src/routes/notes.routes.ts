import { Router } from "express";
import {
  createNotes,
  deleteNotesById,
  getAllNotes,
  getNotesById,
  updateNotesById,
} from "../controllers/notes.controller";
import { validate } from "../middleware/validate.middleware";
import { protect, restrictTo } from "../middleware/auth.middleware";
import { createNotesValidation } from "../schemas/notes.schema";

const router = Router();

router.post("/", validate(createNotesValidation), protect, createNotes);
router.get("/", protect, getAllNotes);
router.get("/:notesid", protect, getNotesById);

router.delete("/:notesid", protect, deleteNotesById);
router.patch("/:notesid", protect, updateNotesById);

export default router;
