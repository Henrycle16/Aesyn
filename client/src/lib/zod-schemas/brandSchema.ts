import { z } from "zod";

export const FormDataSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
});