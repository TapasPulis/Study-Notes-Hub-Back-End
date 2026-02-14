import express, { type Request, type Response } from "express";
import notesRoutes from "../routes/notes.routes";
import usersRoutes from "../routes/user.routes";
import { errorHandler } from "../middleware/error.middleware";
import authRoutes from "../routes/auth.routes";
import deckRoutes from "../routes/deck.routes";

export const createApp = () => {
  const app = express();
  app.use(express.json());

  app.use("/api/notes", notesRoutes);
  app.use("/api/notes/:id", notesRoutes);

  app.use("/api/users", usersRoutes);
  app.use("/api/users/:id", usersRoutes);

  app.use("/api/decks", deckRoutes);
  app.use("/api/decks/:id", deckRoutes);

  app.use("/api/auth", authRoutes);

  app.use(errorHandler);

  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
  });

  return app;
};
