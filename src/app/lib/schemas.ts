import { z } from "zod";

export const ShoppingListSchema = z.object({
  name: z
    .string()
    .min(3, "Names must be at least 3 characters long")
    .max(50, "Names can only be 50 characters long"),
  description: z
    .string()
    .min(3, "Descriptions must be at least 3 characters long")
    .max(300, "Descriptions can only be 500 characters long"),
});

export const ShoppingListItemSchema = z.object({
  name: z.string().min(1),
  quantity: z.number().min(1),
  unit: z.enum(
    [
      "GRAM",
      "KILOGRAM",
      "LITER",
      "MILLILITER",
      "TEASPOON",
      "TABLESPOON",
      "CUP",
      "PINCH",
      "PIECE",
    ],
    {
      required_error: "Unit is required",
      invalid_type_error: "Invalid unit",
    },
  ),
});

export const ReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});

export const RecipeSchema = z.object({
  name: z
    .string()
    .min(3, "Names must be at least 3 characters long")
    .max(50, "Names can only be 50 characters long"),
  description: z
    .string()
    .min(3, "Descriptions must be at least 3 characters long")
    .max(500, "Descriptions can only be 500 characters long"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD", "EXPERT"]),
  tags: z
    .array(
      z
        .string({ invalid_type_error: "Tags must be strings" })
        .regex(/^[a-z]+$/, "Tags can only contain lowercase characters"),
    )
    .max(10, "A recipe can only have 10 tags")
    .refine((items) => new Set(items).size === items.length, {
      message: "Must be an array of unique strings",
    }),
  images: z.array(z.string()),
  steps: z
    .array(
      z.object({
        description: z
          .string()
          .min(3, "Descriptions must be at least 3 characters long")
          .max(500, "Descriptions can only be 500 characters long"),
        duration: z.number().min(1, "Duration must be at least 1 minute"),
        stepType: z.enum(["PREP", "COOK", "REST", "SEASON", "SERVE", "MIX"], {
          required_error: "Step type is required",
          invalid_type_error: "Invalid step type",
        }),
        ingredients: z.array(
          z.object({
            name: z
              .string()
              .min(1, "Name must be at least 1 character long")
              .max(50, "Name can only be 50 characters long"),
            quantity: z.number().min(1, "Quantity must be at least 1"),
            unit: z.enum(
              [
                "GRAM",
                "KILOGRAM",
                "LITER",
                "MILLILITER",
                "TEASPOON",
                "TABLESPOON",
                "CUP",
                "PINCH",
                "PIECE",
              ],
              {
                required_error: "Unit is required",
                invalid_type_error: "Invalid unit",
              },
            ),
          }),
        ),
      }),
    )
    .nonempty("A recipe must have at least one step")
    .refine(
      (steps) =>
        steps.some((step) => step.ingredients && step.ingredients.length > 0),
      {
        message: "A recipe must have at least one ingredient",
      },
    ),
});
