import mongoose from "mongoose";

export interface FlashcardDocument {
  id: string;
  question: string;
  answer: string;
  deck: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const FlashcardSchema = new mongoose.Schema(
  {
    question: { type: "string", required: true },
    answer: { type: "string", required: true },
    deck: { type: mongoose.Schema.Types.ObjectId, ref: "Deck", required: true },
  },
  { timestamps: true },
);

export const FlashcardModel = mongoose.model<FlashcardDocument>(
  "Flashcard",
  FlashcardSchema,
);
