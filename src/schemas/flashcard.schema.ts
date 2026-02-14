import { z } from "zod";

export const createFlashcardValidation = z.object({
  body: z.object({
    question: z.string().min(5),
    answer: z.string().min(5),
  }),
});

export type CreateFlashcardTypeZ = z.infer<
  typeof createFlashcardValidation
>["body"];
