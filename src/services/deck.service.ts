import mongoose from "mongoose";
import { DeckModel, DeckDocument } from "../models/deck.model";
import { AppError } from "../utils/app.error";

export const createDeckService = async (
  userId: string,
  payload: Partial<DeckDocument>, // Partial lets us pass only some of the fields of DeckDocument when creating a new deck
) => {
  const deck = await DeckModel.create({
    ...payload,
    user: new mongoose.Types.ObjectId(userId), // Convert userId to ObjectId before saving
  });
  return deck;
};

export const getAllDecksService = async (userId: string) => {
  const decks = await DeckModel.find({
    $or: [
      // This is a MongoDB query operator that allows us to find documents that match at least one of the conditions. So here we are looking for decks that either belong to the user or are public.
      { user: userId },
      { isPublic: true },
    ],
  }).sort({ createdAt: -1 }); // This sorts the decks by creation date in descending order (newest first)

  if (decks.length === 0) {
    throw new AppError("No decks found for this user", 404);
  }

  return decks;
};

export const getDeckByIdService = async (userId: string, deckId: string) => {
  const deck = await DeckModel.findById(deckId);
  if (!deck) {
    throw new AppError("Deck not found for this user", 404);
  }
  if (deck.user.toString() !== userId && !deck.isPublic) {
    throw new AppError("Unauthorized access to this deck", 403);
  }
  return deck;
};

export const updateDeckByIdService = async (
  userId: string,
  deckId: string,
  updateData: Partial<DeckDocument>,
) => {
  const deck = await DeckModel.findById(deckId);
  if (!deck) {
    throw new AppError("Deck not found for this user", 404);
  }
  if (deck.user.toString() !== userId) {
    throw new AppError("Not authorized to update this deck", 403);
  }

  const updatedDeck = await DeckModel.findByIdAndUpdate(deckId, updateData, {
    new: true,
    runValidators: true,
  });

  return updatedDeck;
};

export const deleteDeckByIdService = async (userId: string, deckId: string) => {
  const deck = await DeckModel.findByIdAndDelete(deckId);
  if (!deck) {
    throw new AppError("Deck not found for this user", 404);
  }
  if (deck.user.toString() !== userId) {
    throw new AppError("Not authorized to delete this deck", 403);
  }
  return { message: "Deck deleted successfully" };
};
