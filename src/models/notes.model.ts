import mongoose from "mongoose";

export interface NotesDocument {
  name: string;
  body: string;
  subject: string;
  difficulty: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const notesSchema = new mongoose.Schema(
  {
    name: { type: "string", required: true },
    body: { type: "string", required: true },
    subject: { type: "string", required: true },
    difficulty: { type: "string", required: true },
  },
  { timestamps: true },
);

export const NotesModel = mongoose.model<NotesDocument>("Notes", notesSchema);
