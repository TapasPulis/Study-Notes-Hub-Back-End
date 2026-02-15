import express, { type Request, type Response } from "express";
import notesRoutes from "../routes/notes.routes";
import usersRoutes from "../routes/user.routes";
import { errorHandler } from "../middleware/error.middleware";
import authRoutes from "../routes/auth.routes";
import deckRoutes from "../routes/deck.routes";
import flashcardRoutes from "../routes/flashcard.routes";
import cors from "cors";
export const createApp = () => {
  const app = express();
  app.use(express.json());

  app.use(
    cors({
      origin: "http://localhost:5173", // Update this to match your frontend URL
      credentials: true, // Allow cookies to be sent with requests
    }),
  );

  app.use("/api/notes", notesRoutes);

  app.use("/api/users", usersRoutes);

  app.use("/api/decks", deckRoutes);

  app.use("/api/decks/:deckId/flashcards", flashcardRoutes);

  app.use("/api/auth", authRoutes);

  app.use(errorHandler);

  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
  });

  return app;
};
