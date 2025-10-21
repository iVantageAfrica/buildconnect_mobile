import { z } from 'zod';

export const loginSchema = z.object({
  emailAddress: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address")
    .toLowerCase(), 

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(64, "Password cannot exceed 64 characters")
});



export type LoginInput = z.infer<typeof loginSchema>;