import mongoose from "mongoose";

export interface DeckDocument {
  id: string;
  title: string;
  description?: string;
  user: mongoose.Types.ObjectId; // Reference to the User model
  createdAt?: Date;
  updatedAt?: Date;
}

const DeckDocumentSchema = new mongoose.Schema(
  {
    title: { type: "string", required: true },
    description: { type: "string" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model and type of the field is ObjectId, which is a special type in Mongoose used for referencing other documents in MongoDB
  },

  { timestamps: true },
);

export const DeckModel = mongoose.model<DeckDocument>(
  "Deck",
  DeckDocumentSchema,
);
