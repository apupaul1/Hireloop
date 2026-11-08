import { z } from "zod";

const emailField = z
  .string()
  .trim()
  .min(1, "Email is required.")
  .refine((value) => z.email().safeParse(value).success, {
    message: "Enter a valid email address.",
  });

export const signInSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Password is required."),
});

export const signUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Full name is required.")
    .min(2, "Full name must be at least 2 characters long.")
    .max(60, "Full name must be 60 characters or fewer."),
  email: emailField,
  password: z
    .string()
    .min(1, "Password is required.")
    .min(8, "Password must be at least 8 characters long.")
    .max(72, "Password must be 72 characters or fewer."),
  role: z.enum(["seeker", "recruiter", "admin"], {
    error: "Select an account type.",
  }),
});

export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;

export type SignInField = keyof SignInValues;
export type SignUpField = keyof SignUpValues;

/**
 * Converts a Zod error into one message per form field, so forms can render
 * errors inline without depending on Zod's error shape.
 */
export function getFieldErrors<TField extends string>(
  error: z.ZodError,
): Partial<Record<TField, string>> {
  const errors: Partial<Record<TField, string>> = {};

  for (const issue of error.issues) {
    const field = issue.path[0];

    if (typeof field !== "string") continue;

    const key = field as TField;

    if (!errors[key]) {
      errors[key] = issue.message;
    }
  }

  return errors;
}
