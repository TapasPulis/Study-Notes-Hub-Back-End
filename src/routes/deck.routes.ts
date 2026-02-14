import { Router } from "express";
import {
  createDeck,
  getDecks,
  getDeckById,
  updateDeckById,
  deleteDeckById,
} from "../controllers/deck.controller";
import { validate } from "../middleware/validate.middleware";
import { protect } from "../middleware/auth.middleware";
import { createDeckValidation } from "../schemas/deck.schema";

const router = Router();

router.post("/", validate(createDeckValidation), protect, createDeck);
router.get("/", protect, getDecks);
router.get("/:deckId", protect, getDeckById);
router.patch("/:deckId", protect, updateDeckById);
router.delete("/:deckId", protect, deleteDeckById);

export default router;
