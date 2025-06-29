import { Suspense } from "react";
import Link from "next/link";
import RecipeListItems from "@/components/RecipeListItems";
import RecipeListSkeleton from "@/components/RecipeListSkeleton";
import { navigationRoutes } from "@/constants/navigationRoutes.constant";

export default function Home() {
  return (
    <div className="flex-1">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-16 gap-8">
          <div className="space-y-6 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
                RecipEase
              </h1>
              <p className="text-2xl text-gray-600 font-medium">
                React 19 Recipe Sharing App
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-sm font-semibold shadow-sm">
                ⚛️ React 19
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 text-sm font-semibold shadow-sm">
                🚀 Next.js 15
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Link
              href={navigationRoutes.demo}
              className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-2xl hover:shadow-3xl cursor-pointer transform hover:scale-105 font-semibold text-lg overflow-hidden"
            >
              <span className="relative z-10 flex items-center space-x-3">
                <span>🚀</span>
                <span>React 19 and Next 15 Demo</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
            </Link>
          </div>
        </div>

        <Suspense fallback={<RecipeListSkeleton />}>
          <RecipeListItems />
        </Suspense>
      </div>
    </div>
  );
}
