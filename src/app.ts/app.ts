import express, { type Request, type Response } from "express";
import notesRoutes from "../routes/notes.routes";

export const createApp = () => {
  const app = express();
  app.use(express.json());

  app.use("/api/notes", notesRoutes);

  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
  });

  return app;
};
