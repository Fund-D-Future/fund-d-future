import { z } from "zod"

export type UserRole = "student" | "funder"
export type FormState<T> =
  | {
      errors?: {
        [K in keyof T]?: string[]
      }
      message?: string
    }
  | undefined

// Define the schema for the signup form
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

// Define the schema for the new campaign form
export const newCampaignFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long").trim(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(1024, "Description must be at most 512 characters long")
    .trim(),
  goal: z.number().int().positive("Goal must be a positive number"),
  currency: z.string().length(3, "Currency must be a 3-letter code").toUpperCase(),
  duration: z.enum(["30d", "60d", "90d", "6m", "1y"], { message: 'Must be one of "30d", "60d", "90d", "6m", "1y"' }),
  purpose: z.array(
    z.enum([
      "tuition",
      "accommodation_and_living_expenses",
      "textbooks_and_study_materials",
      "tech_equipment",
      "bootcamps_and_certifications",
      "study_abroad_or_exchange_programs",
    ])
  ),
  thumbnail: z.string().url("Please enter a valid URL"),
})

export type NewCampaignForm = z.infer<typeof newCampaignFormSchema>
