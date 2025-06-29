"use server";

import prisma from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PRISMA_ERROR_CODES } from "@/constants/prismaErrors.constant";
import { recipeFormSchema } from "@/schemas/recipe.schema";
import { MESSAGES } from "@/constants/messages.constant";
import { revalidateTag } from "next/cache";

/**
 * @description Server action to update an existing recipe
 */
export async function updateRecipe(
  id: string,
  _prevState: { message: string, sucess?: boolean },
  formData: FormData
) {
  try {
    // Convert FormData to object and add the ID
    const formDataObj = Object.fromEntries(formData.entries());
    formDataObj.id = id;

    // Validate with Zod schema
    const validationResult = recipeFormSchema.safeParse(formDataObj);

    if (!validationResult.success) {
      const errorMessage =
        validationResult.error.errors[0]?.message ||
        MESSAGES.ERROR.VALIDATION_FAILED;
      return { message: errorMessage, success: false };
    }

    // Extract validated and transformed data
    const { title, ingredients, instructions, prepTime, cookTime } =
      validationResult.data;

    // Direct Prisma call
    await prisma.recipe.update({
      where: { id },
      data: {
        title,
        ingredients,
        instructions,
        prepTime,
        cookTime,
      },
    });

    // Revalidate cache tags
    revalidateTag('recipes');
    revalidateTag(`recipe-${id}`);

    return { message: MESSAGES.SUCCESS.RECIPE_UPDATED, success: true };
  } catch (error) {
    // Handle case when recipe is not found
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === PRISMA_ERROR_CODES.RECORD_NOT_FOUND
    ) {
      return { message: MESSAGES.DB_ERROR.RECIPE_NOT_FOUND, success: false };
    }

    return { message: MESSAGES.DB_ERROR.UNEXPECTED, success: false };
  }
}
