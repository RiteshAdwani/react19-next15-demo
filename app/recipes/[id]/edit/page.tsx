import { notFound } from "next/navigation";
import RecipeForm from "@/components/RecipeForm";
import { Recipe } from "@prisma/client";
import { apiPaths } from "@/constants/apiPaths.constant";

/**
 * @description Edit recipe page
 */
export default async function EditRecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await the params object to ensure it's fully resolved
  const resolvedParams = await params;

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

  return (
    <>
      {/* React 19 Document Metadata */}
      <title>{recipe.title}</title>
      <meta name="description" content={`Edit recipe: ${recipe.title}`} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto max-w-4xl py-12 px-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
              <h1 className="text-3xl font-bold flex items-center space-x-3">
                <span>✏️</span>
                <span>Edit Recipe</span>
              </h1>
              <p className="text-blue-100 mt-2">Update your recipe details</p>
            </div>

            {/* Form */}
            <div className="p-8">
              <RecipeForm recipe={recipe} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
