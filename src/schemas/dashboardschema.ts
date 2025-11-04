import z from "zod";


const fileSchema = z
  .object({
    uri: z.string(),
    name: z.string().optional(),
    type: z.string().optional(),
  })
  .nullable()
  .optional();

export const submitBidSchema = z.object({
  bidAmount: z
    .number()
    .positive("Bid amount must be greater than 0")
    .min(1, "Bid amount is required"),
  
  proposedTimeline: z
    .string()
    .trim()
    .min(1, "Proposed timeline is required"),
  
  projectProposal: z
    .string()
    .trim()
    .min(10, "Proposal must be at least 50 characters")
    .max(5000, "Proposal cannot exceed 5000 characters"),
  
  milestones: z
    .array(
      z.object({
        milestoneName: z
          .string()
          .trim()
          .min(1, "Milestone name is required"),
        completionDate: z
          .string()
          .min(1, "Completion date is required"),
        paymentAmount: z
          .number()
          .positive("Payment amount must be greater than 0"),
      })
    )
    .min(1, "At least one milestone is required"),
  
  portfolioReference: fileSchema.refine((val) => !!val, {
  message: "Additional information is required",
}),
});

export const addPropertySchema = z.object({
   price: z
          .number()
          .positive("Price must be greater than 0"),
  
  propertyTitle: z
    .string()
    .trim()
    .min(1, "Property Title is required"),

      propertyType: z
    .string()
    .trim()
    .min(1, "Property type is required"),


      location: z
    .string()
    .trim()
    .min(1, "Location is required"),

      bedroom: z
    .string()
    .trim()
    .min(1, "Bedroom is required"),

      bathroom: z
    .string()
    .trim()
    .min(1, "Bathroom is required"),

     description: z
    .string()
    .trim()
    .min(1, "Description is required"),

      keyfeatures: z
    .string()
    .trim()
    .min(1, "Key features is required"),
  
  propertyImage: fileSchema.refine((val) => !!val, {
  message: "Additional information is required",
}),
});


export type SubmitBidInput = z.infer<typeof submitBidSchema>;

export type AddPropertyInput = z.infer<typeof addPropertySchema>;

