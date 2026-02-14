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

router.post("/", protect, validate(createDeckValidation), createDeck);
router.get("/", protect, getDecks);
router.get("/:id", protect, getDeckById);
router.patch("/:id", protect, validate(createDeckValidation), updateDeckById);
router.delete("/:id", protect, deleteDeckById);

export default router;
