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

router.post("/", validate(createNotesValidation), createNotes);
router.get("/", protect, getAllNotes);
router.get("/:id", protect, getNotesById);

router.delete("/:id", protect, restrictTo("admin"), deleteNotesById);
router.patch("/:id", protect, restrictTo("admin"), updateNotesById);

export default router;
