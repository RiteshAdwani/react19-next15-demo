"use client";

import { Recipe } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import SubmitButton from "./SubmitButton";
import { updateRecipe } from "@/actions/updateRecipe.action";
import { createRecipe } from "@/actions/createRecipe.action";
import Form from "next/form";
import { navigationRoutes } from "@/constants/navigationRoutes.constant";

/**
 * @description RecipeForm component for creating or editing recipes.
 */
const RecipeForm = ({ recipe }: { recipe?: Recipe }) => {
  const router = useRouter();
  const isEditing = !!recipe;

  // Define a type for our form state
  type FormActionState = { message: string; success?: boolean };

  // Initial state with message property
  const initialState: FormActionState = { message: "", success: false };

  // Use the form state hook with our properly typed actions
  const [state, formAction] = useActionState<FormActionState, FormData>(
    isEditing ? updateRecipe.bind(null, recipe.id) : createRecipe,
    initialState
  );

  // Handle navigation after successful form submission
  useEffect(() => {
    // If state has a property called success that is true, navigate
    if (state && "success" in state && state.success === true) {
      // Navigate to the recipe detail page or home page
      if (isEditing && recipe) {
        router.push(navigationRoutes.recipeDetails(recipe.id));
      } else {
        router.push(navigationRoutes.home);
      }
    }
  }, [state, isEditing, recipe, router]);

  return (
    <Form action={formAction} className="space-y-8">
      {state.message && "success" in state && !state.success && (
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-700 p-4 rounded-xl shadow-sm">
          <div className="flex items-center space-x-2">
            <span className="text-red-500">❌</span>
            <span className="font-medium">{state.message}</span>
          </div>
        </div>
      )}
      {state.message && "success" in state && state.success && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-700 p-4 rounded-xl shadow-sm">
          <div className="flex items-center space-x-2">
            <span className="text-green-500">✅</span>
            <span className="font-medium">{state.message}</span>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <label
          htmlFor="title"
          className="text-sm font-semibold text-gray-700 flex items-center space-x-2 mb-2"
        >
          <span>📝</span>
          <span>Recipe Title</span>
        </label>
        <input
          id="title"
          name="title"
          defaultValue={recipe?.title || ""}
          className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white font-medium"
          placeholder="Enter a delicious recipe title..."
          required
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="ingredients"
          className="text-sm font-semibold text-gray-700 flex items-center space-x-2 mb-2"
        >
          <span>🥗</span>
          <span>Ingredients (comma separated)</span>
        </label>
        <textarea
          id="ingredients"
          name="ingredients"
          defaultValue={recipe?.ingredients.join(", ") || ""}
          className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white font-medium resize-none"
          rows={4}
          placeholder="1 cup flour, 2 eggs, 1/2 cup milk..."
          required
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="instructions"
          className="text-sm font-semibold text-gray-700 flex items-center space-x-2 mb-2"
        >
          <span>📋</span>
          <span>Instructions</span>
        </label>
        <textarea
          id="instructions"
          name="instructions"
          defaultValue={recipe?.instructions || ""}
          className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white font-medium resize-none"
          rows={6}
          placeholder="Describe step by step how to make this recipe..."
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="prepTime"
            className="text-sm font-semibold text-gray-700 flex items-center space-x-2 mb-2"
          >
            <span>⏱️</span>
            <span>Prep Time (minutes)</span>
          </label>
          <input
            id="prepTime"
            name="prepTime"
            type="number"
            min="0"
            defaultValue={recipe?.prepTime || 0}
            className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white font-medium"
            placeholder="15"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="cookTime"
            className="text-sm font-semibold text-gray-700 flex items-center space-x-2 mb-2"
          >
            <span>🔥</span>
            <span>Cook Time (minutes)</span>
          </label>
          <input
            id="cookTime"
            name="cookTime"
            type="number"
            min="0"
            defaultValue={recipe?.cookTime || 0}
            className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white font-medium"
            placeholder="30"
            required
          />
        </div>
      </div>

      <div className="flex justify-between items-center pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-300 flex items-center space-x-2"
        >
          <span>←</span>
          <span>Cancel</span>
        </button>
        <SubmitButton />
      </div>
    </Form>
  );
};

export default RecipeForm;
