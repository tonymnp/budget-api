import { z } from "zod";

export const transactionSchema = z.object({
  amount: z.number().positive(),
  category: z.string().min(1)
});