import { z } from "zod"

export type UserRole = "student" | "funder"

export const signupFormSchema = z
  .object({
    role: z.enum(["student", "funder"], { message: "Role must be either 'student' or 'funder'" }),
    firstName: z.string().min(2, "First name must be at least 2 characters long").trim(),
    lastName: z.string().min(2, "Last name must be at least 2 characters long").trim(),
    email: z.string().email("Please enter a valid email address").trim().toLowerCase(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Za-z]/, "Password must contain at least one letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "'Confirm password' must match 'Password'",
    path: ["confirmPassword"],
  })

export type SignupForm = z.infer<typeof signupFormSchema>

export type FormState =
  | {
      errors?: {
        [K in keyof SignupForm]?: string[]
      }
      message?: string
    }
  | undefined
