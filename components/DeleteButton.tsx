"use client";

import { deleteRecipe } from "@/actions/deleteRecipe.action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MESSAGES } from "@/constants/messages.constant";
import { navigationRoutes } from "@/constants/navigationRoutes.constant";

/**
 * @description A button component for deleting a recipe.
 */
const DeleteButton = ({ recipeId }: { recipeId: string }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  // Create a direct delete function that doesn't rely on form submission
  const handleDelete = async () => {
    if (confirm(MESSAGES.RECIPE.DELETE_CONFIRMATION)) {
      setIsDeleting(true);

      // Create form data manually
      const formData = new FormData();
      formData.append("id", recipeId);

      try {
        const result = await deleteRecipe({ message: "" }, formData);

        if (result.success) {
          router.push(navigationRoutes.home);
        } else {
          setIsDeleting(false);
          alert(`${MESSAGES.RECIPE.DELETE_ERROR_PREFIX} ${result.message}`);
        }
      } catch (error) {
        console.error("Error in delete operation:", error);
        setIsDeleting(false);
        alert(MESSAGES.DB_ERROR.UNEXPECTED);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-pink-700 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium flex items-center space-x-2 disabled:from-red-300 disabled:to-pink-300 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md"
    >
      {isDeleting ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>{MESSAGES.STATUS.DELETING}</span>
        </>
      ) : (
        <>
          <span>🗑️</span>
          <span>Delete</span>
        </>
      )}
    </button>
  );
};

export default DeleteButton;
