import { Request, Response, NextFunction } from "express";
import * as flashcardService from "../services/flashcard.service";
import { CreateFlashcardTypeZ } from "../schemas/flashcard.schema";

export const createFlashcard = async (
  req: Request<{ deckId: string }, {}, CreateFlashcardTypeZ>,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const flashcard = await flashcardService.createFlashcardService(
      req.user.id,
      req.params.deckId,
      req.body,
    );

    res.status(201).json({
      status: "success",
      data: flashcard,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllFlashcards = async (
  req: Request<{ deckId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const flashcards = await flashcardService.getAllFlashcardsService(
      req.user.id,
      req.params.deckId,
    );

    res.status(200).json({
      status: "success",
      data: flashcards,
    });
  } catch (error) {
    next(error);
  }
};

export const getFlashcardById = async (
  req: Request<{ deckId: string; flashcardId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const flashcard = await flashcardService.getFlashcardByIdService(
      req.user.id,
      req.params.deckId,
      req.params.flashcardId,
    );

    res.status(200).json({
      status: "success",
      data: flashcard,
    });
  } catch (error) {
    next(error);
  }
};

export const updateFlashcardById = async (
  req: Request<
    { deckId: string; flashcardId: string },
    {},
    Partial<CreateFlashcardTypeZ>
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const flashcard = await flashcardService.updateFlashcardByIdService(
      req.user.id,
      req.params.deckId,
      req.params.flashcardId,
      req.body,
    );

    res.status(200).json({
      status: "success",
      data: flashcard,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFlashcardById = async (
  req: Request<{ deckId: string; flashcardId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const deletedFlashcard = await flashcardService.deleteFlashcardByIdService(
      req.user.id,
      req.params.deckId,
      req.params.flashcardId,
    );

    if (!deletedFlashcard) {
      return res.status(404).json({ message: "Flashcard not found" });
    }

    res.status(200).json({
      status: "success",
      data: deletedFlashcard,
    });
  } catch (error) {
    next(error);
  }
};
