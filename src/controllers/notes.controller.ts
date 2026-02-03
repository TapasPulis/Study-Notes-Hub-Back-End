import { NextFunction, Request, Response } from "express";
import * as notesService from "../services/notes.service";
import { CreateNotesTypeZ } from "../schemas/notes.schema";
import { NotesListQueryParams, NotesListRequest } from "../types/query.types";
import {
  capLimit,
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  toPositiveInteger,
} from "../utils/query.util";

export const createNotes = async (
  req: Request<{}, {}, CreateNotesTypeZ>, // We are specifying that req.body will have the shape of CreateNotesTypeZ
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, body, difficulty, subject } = req.body; // Destructuring name and price from the request body
    const newNotes = await notesService.createNotesService(
      name,
      body,
      difficulty,
      subject,
    );
    res.status(201).json(newNotes);
  } catch (error) {
    next(error);
  }
};

export const getAllNotes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      page: pageParam,
      limit: limitParam,
      sort,
      fields,
      search,
      subject,
    } = req.query as NotesListQueryParams;

    const page = toPositiveInteger(pageParam, DEFAULT_PAGE);
    const limit = capLimit(toPositiveInteger(limitParam, DEFAULT_LIMIT));

    const options: NotesListRequest = {
      page,
      limit,
      sort,
      fields,
      search,
      subject,
    };

    const notes = await notesService.findAllNotesService(options);
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNotesById = async (
  req: Request<{ id: string }>, // We are specifying that req.params will have an id of type string
  res: Response,
  next: NextFunction,
) => {
  try {
    const notes = await notesService.findNotesByIdService(req.params.id);
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const updateNotesById = async (
  req: Request<{ id: string }, {}, Partial<CreateNotesTypeZ>>, // We are using Partial here because we might update either name or price or both
  res: Response,
  next: NextFunction,
) => {
  try {
    const updatedNotes = await notesService.updateByIdService(
      req.params.id,
      req.body,
    ); // We are passing in two arguments: id and the update data because the service function requires both to perform the update
    res.status(200).json(updatedNotes);
  } catch (error) {
    next(error);
  }
};

export const deleteNotesById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deletedNotes = await notesService.deleteByIdService(req.params.id);
    res.status(200).json({ message: "Notes deleted successfully" });
  } catch (error) {
    next(error);
  }
};
