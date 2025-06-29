/**
 * @description: A skeleton component for displaying a list of recipes with a loading state.
 */
const RecipeListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-xl animate-pulse"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-3/4 mb-3"></div>
              <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg w-1/2"></div>
            </div>
            <div className="flex space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl"></div>
              <div className="w-16 h-10 bg-gradient-to-r from-red-200 to-pink-200 rounded-2xl"></div>
            </div>
          </div>

          {/* Time info */}
          <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg w-2/3 mb-4"></div>

          {/* Ingredients preview */}
          <div className="mb-6">
            <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg w-full mb-2"></div>
            <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg w-4/5"></div>
          </div>

          {/* View recipe link */}
          <div className="flex justify-end">
            <div className="h-5 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-lg w-24"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeListSkeleton;
