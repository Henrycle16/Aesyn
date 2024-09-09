import { z } from 'zod';
import validator from 'validator';
import axios from "axios";

export const FormDataSchema = z.object({
  firstName: z.string().min(1, "Required").refine((data) => validator.isAlpha(data), "Invalid characters"),
  lastName: z.string().min(1, "Required").refine((data) => validator.isAlpha(data), "Invalid characters"),
  questionnaire: z.string().min(1, "Required"),
  applicantType: z.unknown(),
  email: z.string().min(1, "Required").email("Invalid entry"),
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