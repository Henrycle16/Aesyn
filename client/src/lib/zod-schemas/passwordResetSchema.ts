import { z } from "zod";

export const PasswordResetSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
  password2: z.string().min(6, "Passwords must match"),
  })
  .superRefine(async ({ password, password2 }, ctx) => {
    if (password2 !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["password2"]
      })
    }
  });
