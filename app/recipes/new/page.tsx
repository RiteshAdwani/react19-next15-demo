import RecipeForm from "@/components/RecipeForm";

/**
 * @description New recipe page component that allows users to create a new recipe.
 */
export default function NewRecipePage() {
  return (
    <>
      <title>Create New Recipe</title>
      <meta name="description" content="Create a new recipe" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto max-w-4xl py-12 px-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-8 text-white">
              <h1 className="text-3xl font-bold flex items-center space-x-3">
                <span>👨‍🍳</span>
                <span>Create New Recipe</span>
              </h1>
              <p className="text-emerald-100 mt-2">
                Share your culinary creation with the world
              </p>
            </div>

            {/* Form */}
            <div className="p-8">
              <RecipeForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
