import { z } from "zod";

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
    .max(64, "Password cannot exceed 64 characters"),
});



export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(64, "Password cannot exceed 64 characters"),

    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(64, "Password cannot exceed 64 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], 
  });


export const forgotPasswordSchema = z.object({
  emailAddress: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address")
    .toLowerCase(),
});

export const userSchema = z.object({
  email: z.string().email("Invalid email format"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  mobileNumber: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number must not exceed 15 digits"),
  termsAccepted: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must agree to the Terms and Privacy Policy",
    }),
});


const fileSchema = z
  .object({
    uri: z.string(),
    name: z.string().optional(),
    type: z.string().optional(),
  })
  .nullable()
  .optional();

export const fullProfileSchema = z.object({
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters")
    .max(100, "Business name is too long"),
    
  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location is too long"),

  serviceRadius: z.string().min(1, "Service radius is required"),
  yearOfExperience: z.string().min(1, "Years of experience is required"),

  profilePhoto: fileSchema.refine((val) => !!val, {
    message: "Profile photo is required",
  }),

  contractorLicense: fileSchema.refine((val) => !!val, {
  message: "Contractor license is required",
}),
insuranceDocumentation: fileSchema.refine((val) => !!val, {
  message: "Insurance documentation is required",
}),
additionalInformation: fileSchema.refine((val) => !!val, {
  message: "Additional information is required",
}),
services: z.array(z.string()).min(1, "Select at least one project type"),
projectPhoto: fileSchema.refine((val) => !!val, {
    message: "Profile photo is required",
  }),
startTime: z.string().min(1, "Select start date"),
endTime: z.string().min(1, "Select end date"),
availableDays: z.array(z.string()).min(1, "Select available days"),
availableTime: z.string().min(1, "Available time is required"),
});
  
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type FullProfileInput = z.infer<typeof fullProfileSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type SignUpInput = z.infer<typeof userSchema>;