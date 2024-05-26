import { z } from 'zod';
import validator from 'validator';

export const FormDataSchema = z.object({
  firstName: z.string().min(1, "First name is required").refine((data) => validator.isAlpha(data), "No numbers"),
  lastName: z.string().min(1, "Last name is required").refine((data) => validator.isAlpha(data), "No numbers!"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  password2: z.string().min(6, "Password must be at least 6 characters"),
}).superRefine(({ password, password2 }, ctx) => {
  if (password2 !== password) {
    ctx.addIssue({
      code: "custom",
      message: "Passwords do not match",
      path: ["password2"]
    })
  }
})