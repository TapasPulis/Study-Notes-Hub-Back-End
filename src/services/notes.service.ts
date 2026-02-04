import { NotesDocument, NotesModel } from "../models/notes.model";
import { CreateNotesTypeZ } from "../schemas/notes.schema";
import { NotesListRequest, ListResult } from "../types/query.types";
import { AppError } from "../utils/app.error";
import {
  buildSearchQuery,
  parseBoolean,
  parseProjection,
  parseSort,
} from "../utils/query.util";

const allowedSortFields = [
  "createdAt",
  "name",
  "subject",
  "difficulty",
  "updatedAt",
] as const;

const allowedProjectionFields = [
  "_id",
  "name",
  "body",
  "subject",
  "difficulty",
  "createdAt",
  "updatedAt",
] as const;
const allowedSearchFields = ["name", "body", "subject", "difficulty"] as const;

export const createNotesService = async (
  name: string,
  body: string,
  difficulty: string,
  subject: string,
) => {
  const existingNotes = await NotesModel.findOne({ name });
  if (existingNotes) {
    throw new AppError("Notes with this name already exists", 409);
  }

  const newNotes: CreateNotesTypeZ = {
    name,
    body,
    subject,
    difficulty,
  };
  const createdNotes = await NotesModel.create(newNotes);
  return createdNotes;
};

export const findAllNotesService = async (
  params: NotesListRequest,
): Promise<ListResult<NotesDocument>> => {
  const { limit, page, fields, search, sort, subject } = params;

  const filters: Record<string, unknown> = {};
  if (subject) filters.subject = subject; // This adds a filter for subject if provided
  const searchQuery = buildSearchQuery(search, [...allowedSearchFields]);
  const query: Record<string, unknown> = { ...filters, ...(searchQuery ?? {}) };

  const sortBy = parseSort(sort, [...allowedSortFields], "-createdAt");
  const projection = parseProjection(fields, [...allowedProjectionFields]);

  const skip = (page - 1) * limit;

  const findQuery = NotesModel.find(query).sort(sortBy).skip(skip).limit(limit);

  if (projection) findQuery.select(projection);

  const [data, total] = await Promise.all([
    findQuery.exec(),
    NotesModel.countDocuments(query),
  ]);

  const totalPages = Math.ceil(total / limit) || 1;

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages,
    },
  };
};

export const findNotesByIdService = async (id: string) => {
  const notesId = await NotesModel.findById(id);
  if (!notesId) {
    throw new AppError("Notes with the provided ID could not be found", 404);
  }
  return notesId;
};

export const updateByIdService = async (
  id: string, // We are passing in id as an argument to identify which product to update
  updateData: Partial<CreateNotesTypeZ>, // We are passing in updateData as an argument which contains the fields to be updated, in this case, it can be either name or price or both
) => {
  const updatedNotes = await NotesModel.findByIdAndUpdate(id, updateData, {
    new: true, // This option returns the newly modified document and not the original
    runValidators: true, // This option runs the schema validators on the update operation so that the updated data follows the schema rules
  });

  if (!updatedNotes) {
    throw new AppError("Notes with the provided ID could not be found", 404);
  }
  return updatedNotes;
};

export const deleteByIdService = async (id: string) => {
  const deletedNotes = await NotesModel.findByIdAndDelete(id);
  if (!deletedNotes) {
    throw new AppError("Notes with the provided ID could not be found", 404);
  }
  return deletedNotes;
};
