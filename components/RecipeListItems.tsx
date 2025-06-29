import RecipeCard from "@/components/RecipeCard";
import Link from "next/link";
import { Recipe } from "@prisma/client";
import { apiPaths } from "@/constants/apiPaths.constant";
import { navigationRoutes } from "@/constants/navigationRoutes.constant";

/**
 * @description Component to display a list of recipe cards
 * This component fetches recipes from the API and displays them in a grid layout.
 * If no recipes are found, it shows a message prompting the user to create their first recipe.
 */
const RecipeListItems = async () => {
  // Fetch recipes from the API endpoint
  let recipes: Recipe[] = [];

  try {
    const response = await fetch(apiPaths.getRecipes, {
      cache: "force-cache",
      next: {
        tags: ["recipes"],
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    recipes = await response.json();
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20 max-w-2xl mx-auto">
          <div className="text-6xl mb-6">👨‍🍳</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            No Recipes Yet
          </h3>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Be the first to share your delicious creations with the community!
          </p>
          <div className="flex justify-center">
            <Link
              href={navigationRoutes.createRecipe}
              className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-4 rounded-2xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold flex items-center space-x-2 cursor-pointer"
            >
              <span>✨</span>
              <span>Create Your First Recipe</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeListItems;
