import { z } from 'zod';
import validator from 'validator';

export const FormDataSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  contactPersonName: z.string().min(1, "Contact person name is required").refine((data) => validator.isAlpha(data, 'en-US', {ignore: " '" }), "No numbers or special characters"),
  contactPhoneNumber: z.string().min(10, "Valid phone number required"),
})