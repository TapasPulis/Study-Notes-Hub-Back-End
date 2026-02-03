import { z } from "zod";

export const createNotesValidation = z.object({
  body: z.object({
    name: z.string().min(3),
    body: z.string().min(10),
    subject: z.string().min(3),
    difficulty: z.string().min(3),
  }),
});

export type CreateNotesTypeZ = z.infer<typeof createNotesValidation>["body"];
