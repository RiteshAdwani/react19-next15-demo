"use server";

import { prisma } from "@/lib/prisma";
import { getUser } from "./getUser.action";
import { revalidateTag } from "next/cache";
import { MESSAGES } from "@/constants/messages.constant";

/**
 * @description Toggles the like status of a recipe for the currently authenticated user.
 */
export async function toggleRecipeLike(recipeId: string) {
  try {
    const user = await getUser();
    if (!user) {
      throw new Error(MESSAGES.AUTH.AUTHENTICATION_REQUIRED);
    }

    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
      select: { likes: true, likedBy: true },
    });

    if (!recipe) {
      throw new Error(MESSAGES.DB_ERROR.RECIPE_NOT_FOUND);
    }

    const isCurrentlyLiked = recipe.likedBy.includes(user.id);

    let updatedRecipe;

    if (isCurrentlyLiked) {
      // Unlike: remove user from likedBy array and decrement likes
      updatedRecipe = await prisma.recipe.update({
        where: { id: recipeId },
        data: {
          likes: Math.max(0, recipe.likes - 1), // Ensure likes never go below 0
          likedBy: recipe.likedBy.filter((id) => id !== user.id),
        },
        select: { likes: true, likedBy: true },
      });
    } else {
      // Like: add user to likedBy array and increment likes
      updatedRecipe = await prisma.recipe.update({
        where: { id: recipeId },
        data: {
          likes: recipe.likes + 1,
          likedBy: [...recipe.likedBy, user.id],
        },
        select: { likes: true, likedBy: true },
      });
    }

    // Revalidate cache tags
    revalidateTag("recipes");
    revalidateTag(`recipe-${recipeId}`);

    return {
      success: true,
      likes: updatedRecipe.likes,
      isLiked: updatedRecipe.likedBy.includes(user.id),
    };
  } catch (error) {
    throw error;
  }
}
