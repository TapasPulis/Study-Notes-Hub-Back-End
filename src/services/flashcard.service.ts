import mongoose from "mongoose";
import { FlashcardModel, FlashcardDocument } from "../models/flashcard.model";
import { AppError } from "../utils/app.error";
import { DeckModel } from "../models/deck.model";

export const createFlashcardService = async (
  userId: string,
  deckId: string,
  payload: Partial<FlashcardDocument>,
) => {
  const deck = await DeckModel.findOne({ _id: deckId, user: userId }); // This makes sure that the deck belongs to the user. We use FindOne instead of FindById because we need to check both the deckId and userId to ensure that the user is authorized to add flashcards to that deck. If we used FindById, it would only check for the deckId and would allow a user to add flashcards to a deck that doesn't belong to them if they know the deckId.
  if (!deck) {
    throw new AppError("Deck not found or not authorized", 404);
  }
  const flashcard = await FlashcardModel.create({
    ...payload, // Spread operator copies all properties from FlashcardDocument and adds the deckId to the new flashcard document. This is because deckId is an extra field that the client doesn't need to provide when creating a flashcard, but it is necessary for connecting the flashcard with the correct deck in the database.
    deck: deckId,
  });
  return flashcard;
};

export const getAllFlashcardsService = async (
  userId: string,
  deckId: string,
) => {
  const deck = await DeckModel.findOne({ _id: deckId, user: userId });
  if (!deck) {
    throw new AppError("Deck not found or not authorized", 404);
  }
  const flashcards = await FlashcardModel.find({ deck: deckId });

  return flashcards;
};

export const getFlashcardByIdService = async (
  userId: string,
  deckId: string,
  flashcardId: string,
) => {
  const deck = await DeckModel.findOne({ _id: deckId, user: userId });
  if (!deck) {
    throw new AppError("Deck not found or not authorized", 404);
  }
  const flashcard = await FlashcardModel.findOne({
    _id: flashcardId,
    deck: deckId,
  });
  if (!flashcard) {
    throw new AppError("Flashcard not found for this deck", 404);
  }
  return flashcard;
};

export const updateFlashcardByIdService = async (
  userId: string,
  deckId: string,
  flashcardId: string,
  updateData: Partial<FlashcardDocument>,
) => {
  const deck = await DeckModel.findOne({ _id: deckId, user: userId });
  if (!deck) {
    throw new AppError("Deck not found or not authorized", 404);
  }
  const flashcard = await FlashcardModel.findOneAndUpdate(
    { _id: flashcardId, deck: deckId },
    updateData,
    { new: true, runValidators: true },
  );
  if (!flashcard) {
    throw new AppError("Flashcard not found for this deck", 404);
  }
  return flashcard;
};

export const deleteFlashcardByIdService = async (
  userId: string,
  deckId: string,
  flashcardId: string,
) => {
  const deck = await DeckModel.findOne({ _id: deckId, user: userId });
  if (!deck) {
    throw new AppError("Deck not found or not authorized", 404);
  }
  const flashcard = await FlashcardModel.findOneAndDelete({
    _id: flashcardId,
    deck: deckId,
  });
  if (!flashcard) {
    throw new AppError("Flashcard not found for this deck", 404);
  }
  return flashcard;
};
