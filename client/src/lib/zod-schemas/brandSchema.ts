import { z } from "zod";
import validator from "validator";

export const FormDataSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  firstName: z
    .string()
    .min(1, "First name is required")
    .refine(
      (data) => validator.isAlpha(data),
      "No numbers or special characters"
    ),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .refine(
      (data) => validator.isAlpha(data),
      "No numbers or special characters"
    ),
  contactPhoneNumber: z
    .string()
    .min(10, "Valid phone number required")
    .refine((data) => validator.isInt(data), "Valid phone number required")
});