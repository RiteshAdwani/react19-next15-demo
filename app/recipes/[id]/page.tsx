import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteButton from "@/components/DeleteButton";
import { Recipe } from "@prisma/client";
import { getUser } from "@/actions/getUser.action";
import { navigationRoutes } from "@/constants/navigationRoutes.constant";
import { apiPaths } from "@/constants/apiPaths.constant";

/**
 * @description Displays the details of a recipe
 */
export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await the params object to ensure it's fully resolved
  const resolvedParams = await params;

  // Get current user
  const user = await getUser();

  let recipe: Recipe | null = null;

  try {
    const response = await fetch(apiPaths.recipeDetails(resolvedParams.id), {
      cache: "force-cache",
      next: {
        tags: ["recipe", `recipe-${resolvedParams.id}`],
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    recipe = await response.json();
  } catch (error) {
    console.error("Error fetching recipe:", error);
  }

  if (!recipe) {
    notFound();
  }

  // Check if current user is the author
  const isAuthor = user && recipe.authorId === user.id;

  return (
    <>
      {/* React 19 Document Metadata */}
      <title>{recipe.title}</title>
      <meta name="description" content={`Recipe for ${recipe.title}`} />
      <meta
        name="description"
        content={`Learn how to make ${recipe.title}. Prep time: ${recipe.prepTime} min, Cook time: ${recipe.cookTime} min.`}
      />
      <meta
        name="keywords"
        content={`recipe, cooking, ${recipe.title}, ${recipe.ingredients
          .slice(0, 3)
          .join(", ")}`}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto max-w-4xl py-12 px-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Header Section */}
            <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-8 text-white">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-3 leading-tight">
                      {recipe.title}
                    </h1>
                    {/* Show ownership indicator */}
                    {isAuthor && (
                      <div className="flex items-center gap-2 mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30">
                          ✨ Your recipe
                        </span>
                      </div>
                    )}
                    <div className="flex items-center space-x-6 text-blue-100">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">⏱️</span>
                        <span className="font-medium">
                          Prep: {recipe.prepTime} min
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">🔥</span>
                        <span className="font-medium">
                          Cook: {recipe.cookTime} min
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">⏰</span>
                        <span className="font-medium">
                          Total: {recipe.prepTime + recipe.cookTime} min
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Only show edit/delete buttons if user is the author */}
                  {isAuthor && (
                    <div className="flex space-x-3">
                      <Link
                        href={navigationRoutes.editRecipe(recipe.id)}
                        className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/30 cursor-pointer transition-all duration-300 border border-white/30 font-medium flex items-center space-x-2 hover:scale-105"
                      >
                        <span>✏️</span>
                        <span>Edit</span>
                      </Link>
                      <DeleteButton recipeId={recipe.id} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Ingredients Section */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50">
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="text-3xl">🥗</span>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Ingredients
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-3 p-3 bg-white/60 rounded-xl border border-green-200/30"
                      >
                        <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 font-medium">
                          {ingredient}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/50">
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="text-3xl">📝</span>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Instructions
                    </h2>
                  </div>
                  <div className="bg-white/60 rounded-xl p-6 border border-blue-200/30">
                    <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
                      {recipe.instructions}
                    </p>
                  </div>
                </div>
              </div>

              {/* Back Button */}
              <div className="mt-8 text-center">
                <Link
                  href={navigationRoutes.home}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-4 rounded-2xl hover:from-gray-700 hover:to-gray-800 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
                >
                  <span>←</span>
                  <span>Back to Recipes</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
