import { z } from "zod";

/**
 * Schema for validating recipe form data
 */
export const recipeFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  ingredients: z
    .string()
    .min(1, "Ingredients are required")
    .transform((val) => 
      val
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    ),
  instructions: z.string().min(1, "Instructions are required"),
  prepTime: z
    .string()
    .transform((val) => Number.parseInt(val, 10) || 0),
  cookTime: z
    .string()
    .transform((val) => Number.parseInt(val, 10) || 0),
});

/**
 * Type definitions derived from the schema
 */
export type RecipeFormValues = z.infer<typeof recipeFormSchema>;

/**
 * Schema for validating recipe delete form data
 */
export const recipeDeleteSchema = z.object({
  id: z.string().min(1, "Recipe ID is required"),
});

export type RecipeDeleteValues = z.infer<typeof recipeDeleteSchema>;
