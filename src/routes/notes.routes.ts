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

router.delete("/:notesid", protect, restrictTo("admin"), deleteNotesById);
router.patch("/:notesid", protect, restrictTo("admin"), updateNotesById);

export default router;
