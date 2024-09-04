import { z } from "zod";
import validator from "validator";
import axios from "axios";
import { getCreatorByUserId } from "@/actions/creatorApi";
import { getUserById } from "@/actions/userApi";

import { useAppSelector } from "@/redux/store";

export const PersonalInfoSchema = (userId: string) => {
  return z
    .object({
      userName: z
        .string()
        .min(4, "Username must be 4 characters or more")
        .refine(
          (data) => validator.isAlphanumeric(data, "en-US", { ignore: "._-" }),
          "No special characters"
        )
        .optional()
        .or(z.literal("")),
      email: z
        .string()
        .email("Invalid email address")
        .optional()
        .or(z.literal("")),
    })
    .superRefine(async ({ userName, email }, ctx) => {
      const creator = await getCreatorByUserId(userId);
      const user = await getUserById(userId);

      // Username check
      if (!userName || creator.data.userName == userName) return;
      try {
        const result = await axios.get(
          `http://localhost:5000/api/creators/username/${userName}`
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

      // Email check
      if (!email || user.data.email == email) return;
      try {
        const result = await axios.get(
          `http://localhost:5000/api/users/email/${email}`
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
    });
};
