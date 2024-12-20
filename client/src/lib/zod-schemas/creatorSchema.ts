import { z } from "zod";
import validator from "validator";
import axios from "axios";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

export const FormDataSchema = z
  .object({
    userName: z
      .string()
      .min(4, "Username must be 4 characters or more")
      .refine(
        (data) => validator.isAlphanumeric(data, "en-US", { ignore: "._-" }),
        "No special characters"
      ),
  })
  .superRefine(async ({ userName }, ctx) => {
    if (!userName) return;

    try {
      const result = await axios.get(
        `${serverUrl}/api/creators/username/${userName}`
      );
      if (result.data) {
        ctx.addIssue({
          code: "custom",
          message: "Username is already taken",
          path: ["userName"],
        });
      }
    } catch (error) {
      console.error("Error fetching username: ", error);
    }
  });
