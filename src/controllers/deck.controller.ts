import { Request, Response, NextFunction } from "express";
import * as deckService from "../services/deck.service";
import { CreateDeckTypeZ } from "../schemas/deck.schema";

export const createDeck = async (
  req: Request<{}, {}, CreateDeckTypeZ>, // We are specifying that req.body will have the shape of CreateDeckTypeZ because we will be validating it with the createDeckValidation middleware
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const deck = await deckService.createDeckService(req.user.id, req.body);

    res.status(201).json({
      status: "success",
      data: deck,
    });
  } catch (error) {
    next(error);
  }
};

export const getDecks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decks = await deckService.getAllDecksService(req.user.id);

    res.status(200).json({
      status: "success",
      data: decks,
    });
  } catch (error) {
    next(error);
  }
};

export const getDeckById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const deck = await deckService.getDeckByIdService(
      req.user.id,
      req.params.id as string,
    );

    if (!deck) {
      return res.status(404).json({ message: "Deck not found" });
    }

    res.status(200).json({
      status: "success",
      data: deck,
    });
  } catch (error) {
    next(error);
  }
};

export const updateDeckById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const updatedDeck = await deckService.updateDeckByIdService(
      req.user.id,
      req.params.id as string, // this is the deckId from the URL params, we need to make it a string because req.params.id can be string or undefined
      req.body,
    );

    if (!updatedDeck) {
      return res.status(404).json({ message: "Deck not found" });
    }

    res.status(200).json({
      status: "success",
      data: updatedDeck,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDeckById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const deletedDeck = await deckService.deleteDeckByIdService(
      req.user.id,
      req.params.id as string,
    );

    if (!deletedDeck) {
      return res.status(404).json({ message: "Deck not found" });
    }

    res.status(200).json({
      status: "success",
      data: deletedDeck,
    });
  } catch (error) {
    next(error);
  }
};
