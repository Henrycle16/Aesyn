import { z } from 'zod';
import validator from 'validator';
import axios from "axios";

export const FormDataSchema = z.object({
  firstName: z.string().min(1, "First name is required").refine((data) => validator.isAlpha(data), "No numbers or special characters"),
  lastName: z.string().min(1, "Last name is required").refine((data) => validator.isAlpha(data), "No numbers or special characters"),
  questionnaire: z.string().min(1, "Response is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
}).superRefine(async ({ email }, ctx) => {
  if (!email) return;

  try {
    const result = await axios.get(
      `http://localhost:5000/api/waitlist/email/${email}`
    );
    if (result.data) {
      ctx.addIssue({
        code: "custom",
        message: "Email is already registered",
        path: ["email"],
      });
    }
  } catch (error) {
    console.error("Error fetching email: ", error);
  }
})