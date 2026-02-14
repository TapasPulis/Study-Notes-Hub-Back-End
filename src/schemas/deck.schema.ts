import { z } from "zod";

export const createDeckValidation = z.object({
  body: z.object({
    title: z.string().min(3),
    description: z.string().min(10).optional(),
    isPublic: z.boolean().optional(),
  }),
});

export type CreateDeckTypeZ = z.infer<typeof createDeckValidation>["body"];
