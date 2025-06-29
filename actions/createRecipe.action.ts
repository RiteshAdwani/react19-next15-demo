"use server";

import prisma from "@/lib/prisma";
import { recipeFormSchema } from "@/schemas/recipe.schema";
import { MESSAGES } from "@/constants/messages.constant";
import { getUser } from "./getUser.action";
import { revalidateTag } from "next/cache";

/**
 * @description Server action to create a new recipe
 */
export async function createRecipe(
  _prevState: { message: string; success?: boolean },
  formData: FormData
) {
  try {
    // Get current user
    const user = await getUser();

    if (!user) {
      return {
        message: MESSAGES.AUTH.LOGIN_REQUIRED,
        success: false,
      };
    }
    // Extract form data as object
    const formDataObj = Object.fromEntries(formData.entries());

    // Validate with Zod schema
    const validationResult = recipeFormSchema.safeParse(formDataObj);

    if (!validationResult.success) {
      // Get first error message or default
      const errorMessage =
        validationResult.error.errors[0]?.message ||
        MESSAGES.ERROR.VALIDATION_FAILED;
      return { message: errorMessage, success: false };
    }

    // Extract validated data
    const { title, ingredients, instructions, prepTime, cookTime } =
      validationResult.data;

    await prisma.recipe.create({
      data: {
        title,
        ingredients,
        instructions,
        prepTime,
        cookTime,
        authorId: user.id,
      },
    });

    // Revalidate cache tags
    revalidateTag("recipes");

    // Return a success result
    return { message: MESSAGES.SUCCESS.RECIPE_CREATED, success: true };
  } catch (error) {
    console.error(MESSAGES.ERROR.COULD_NOT_CREATE_RECIPE, error);
    return { message: MESSAGES.DB_ERROR.UNEXPECTED, success: false };
  }
}
