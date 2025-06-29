"use server";

import prisma from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PRISMA_ERROR_CODES } from "@/constants/prismaErrors.constant";
import { recipeDeleteSchema } from "@/schemas/recipe.schema";
import { MESSAGES } from "@/constants/messages.constant";
import { getUser } from "@/actions/getUser.action";
import { revalidateTag } from "next/cache";

/**
 * @description Server action to delete a recipe by ID
 */
export async function deleteRecipe(
  _prevState: { message: string },
  formData: FormData
) {
  // Get form data as an object
  const formDataObj = Object.fromEntries(formData.entries());

  // Validate with Zod schema
  const validationResult = recipeDeleteSchema.safeParse(formDataObj);

  if (!validationResult.success) {
    return {
      message:
        MESSAGES.ERROR.INVALID_RECIPE_ID +
          ": " +
          validationResult.error.errors[0]?.message ||
        MESSAGES.ERROR.REQUIRED_FIELDS,
      success: false,
    };
  }

  const { id } = validationResult.data;

  try {
    // Check if user is authenticated
    const user = await getUser();
    if (!user) {
      return { message: MESSAGES.AUTH.AUTHENTICATION_REQUIRED, success: false };
    }

    // Check if recipe exists and get author info
    const recipe = await prisma.recipe.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!recipe) {
      return { message: MESSAGES.DB_ERROR.RECIPE_NOT_FOUND, success: false };
    }

    // Check if user is the author of the recipe
    if (recipe.authorId !== user.id) {
      return {
        message: MESSAGES.AUTH.UNAUTHORIZED_DELETE,
        success: false,
      };
    }

    // Delete the recipe
    await prisma.recipe.delete({
      where: { id },
    });

    // Revalidate cache tags
    revalidateTag("recipes");
    revalidateTag(`recipe-${id}`);

    return { message: MESSAGES.SUCCESS.RECIPE_DELETED, success: true };
  } catch (error) {
    console.error(MESSAGES.ERROR.COULD_NOT_DELETE_RECIPE, error);

    // Check if error is related to an invalid ObjectId
    const errorWithMessage = error as unknown as { message?: string };
    if (errorWithMessage.message?.includes("Invalid ObjectId")) {
      return { message: MESSAGES.ERROR.INVALID_RECIPE_ID, success: false };
    }

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
