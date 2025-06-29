"use client";

import Link from "next/link";
import { Recipe } from "@prisma/client";
import { useUser } from "@/context/UserContext";
import { Heart, Edit, Trash2, User as UserIcon } from "lucide-react";
import { useTransition, useOptimistic, useRef } from "react";
import { toggleRecipeLike } from "@/actions/toggleLike.action";
import { deleteRecipe } from "@/actions/deleteRecipe.action";
import ActionButton from "./ActionButton";
import { MESSAGES } from "@/constants/messages.constant";
import { navigationRoutes } from "@/constants/navigationRoutes.constant";

interface RecipeCardProps {
  recipe: Recipe;
}

/**
 * @description Component to display a recipe card with actions like liking, editing, and deleting.
 */
const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const user = useUser();

  // React 19: Separate useTransition hooks for different purposes
  const [isDeleting, startDeleteTransition] = useTransition(); // For heavy delete operations
  const [, startTransition] = useTransition(); // For optimistic updates (no loading state needed)

  // React 19: Using refs as props (no forwardRef needed!)
  const likeButtonRef = useRef<HTMLButtonElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  // Initial state
  const isInitiallyLiked = user ? recipe.likedBy.includes(user.id) : false;
  const isAuthor = user && recipe.authorId === user.id;

  // React 19: useOptimistic for immediate UI updates (like button)
  // This provides instant feedback without waiting for server response
  const [optimisticLikeState, addOptimisticLike] = useOptimistic(
    { isLiked: isInitiallyLiked, likes: recipe.likes },
    (state, newIsLiked: boolean) => ({
      isLiked: newIsLiked,
      likes: newIsLiked ? state.likes + 1 : state.likes - 1,
    })
  );

  const handleLike = () => {
    if (!user) {
      alert(MESSAGES.RECIPE.LIKE_LOGIN_REQUIRED);
      return;
    }

    // React 19: addOptimisticLike MUST be called within startTransition
    startTransition(async () => {
      // Immediately update UI optimistically
      addOptimisticLike(!optimisticLikeState.isLiked);

      try {
        // Server action runs in background, useOptimistic handles sync
        await toggleRecipeLike(recipe.id);
      } catch (error) {
        console.error("Error toggling like:", error);
        // useOptimistic will automatically revert on error
      }
    });
  };

  const handleDelete = () => {
    if (!user || !isAuthor) {
      alert(MESSAGES.AUTH.UNAUTHORIZED_DELETE);
      return;
    }

    if (confirm(MESSAGES.RECIPE.DELETE_CONFIRMATION)) {
      // React 19: useTransition for heavy operations like delete
      // This shows loading state during async operation
      startDeleteTransition(async () => {
        const formData = new FormData();
        formData.append("id", recipe.id);

        try {
          const result = await deleteRecipe({ message: "" }, formData);
          if (result.success) {
            // The page will be revalidated automatically
            window.location.reload();
          } else {
            alert(`${MESSAGES.RECIPE.DELETE_ERROR_PREFIX} ${result.message}`);
          }
        } catch (error) {
          console.error("Error deleting recipe:", error);
          alert(MESSAGES.DB_ERROR.UNEXPECTED);
        }
      });
    }
  };

  return (
    <div className="group relative bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">
              <Link
                href={navigationRoutes.recipeDetails(recipe.id)}
                className="text-gray-900 hover:text-blue-600 transition-colors cursor-pointer group-hover:text-blue-700"
              >
                {recipe.title}
              </Link>
            </h2>

            {/* Show ownership indicator for user's own recipes */}
            {isAuthor && (
              <div className="flex items-center gap-2 mt-2">
                <UserIcon className="w-4 h-4 text-blue-500" />
                <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm font-medium">
                  Your recipe
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Edit button - only show for recipe author */}
            {isAuthor && (
              <Link
                href={navigationRoutes.editRecipe(recipe.id)}
                className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all cursor-pointer transform hover:scale-105"
                title="Edit recipe"
              >
                <Edit className="w-5 h-5" />
              </Link>
            )}

            {/* Delete button - only show for recipe author with loading state */}
            {isAuthor && (
              <ActionButton
                ref={deleteButtonRef} // React 19: ref as prop!
                variant="danger"
                onClick={handleDelete}
                disabled={isDeleting}
                className="!px-3 !py-2 !text-sm !rounded-xl"
                title="Delete recipe"
              >
                {isDeleting ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </ActionButton>
            )}

            {/* Like button with pure optimistic updates */}
            <button
              ref={likeButtonRef} // React 19: ref as prop!
              onClick={handleLike}
              className={`group flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 hover:scale-105 border-2 cursor-pointer shadow-lg hover:shadow-xl ${
                optimisticLikeState.isLiked
                  ? "bg-gradient-to-r from-red-50 to-pink-50 text-red-600 border-red-200 hover:from-red-100 hover:to-pink-100 hover:border-red-300"
                  : "bg-white/90 text-gray-600 border-gray-200 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:border-red-200 hover:text-red-500"
              }`}
              title={
                optimisticLikeState.isLiked
                  ? MESSAGES.RECIPE.UNLIKE_TOOLTIP
                  : MESSAGES.RECIPE.LIKE_TOOLTIP
              }
            >
              <Heart
                className={`w-6 h-6 transition-all duration-300 group-hover:scale-110 ${
                  optimisticLikeState.isLiked
                    ? "fill-red-500 text-red-500"
                    : "group-hover:fill-red-100"
                }`}
              />
              <span className="text-sm font-bold min-w-[20px] text-center">
                {optimisticLikeState.likes}
              </span>
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-2">
          Prep: {recipe.prepTime} min | Cook: {recipe.cookTime} min
        </p>

        <div className="mb-4">
          <p className="text-sm text-gray-700 line-clamp-2">
            {recipe.ingredients.slice(0, 3).join(", ")}
            {recipe.ingredients.length > 3
              ? `, +${recipe.ingredients.length - 3} more`
              : ""}
          </p>
        </div>

        <div className="flex justify-end">
          <Link
            href={navigationRoutes.recipeDetails(recipe.id)}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
          >
            View Recipe →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
