import { Router } from "express";
import {
  createFlashcard,
  getAllFlashcards,
  getFlashcardById,
  updateFlashcardById,
  deleteFlashcardById,
} from "../controllers/flashcard.controller";
import { validate } from "../middleware/validate.middleware";
import { protect } from "../middleware/auth.middleware";
import { createFlashcardValidation } from "../schemas/flashcard.schema";

const router = Router({ mergeParams: true }); // Merge params so that we can access deckId in flashcard routes because flashcards are nested under decks

router.post("/", validate(createFlashcardValidation), protect, createFlashcard);
router.get("/", protect, getAllFlashcards);
router.get("/:flashcardId", protect, getFlashcardById);
router.patch("/:flashcardId", protect, updateFlashcardById);
router.delete("/:flashcardId", protect, deleteFlashcardById);

export default router;
