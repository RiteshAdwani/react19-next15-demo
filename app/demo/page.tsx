import Link from "next/link";
import React19Features from "@/components/React19Features";
import Next15Features from "@/components/Next15Features";
import { navigationRoutes } from "@/constants/navigationRoutes.constant";

/**
 * @description Displays the features implemented in the app
 * This page showcases all the cutting-edge features of React 19 and Next.js 15
 */
export default function DemoFeatures() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              React 19 & Next.js 15
            </h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Complete Feature Showcase
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              RecipEase demonstrates ALL the cutting-edge features of React 19
              and Next.js 15 in a real-world application. Every feature listed
              below is actively implemented and working in this app!
            </p>
          </div>

          {/* React 19 Features Section */}
          <React19Features />

          {/* Next.js 15 Features Section */}
          <Next15Features />

          <div className="mt-8 text-center">
            <Link
              href={navigationRoutes.home}
              className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
            >
              ← Back to Recipe App
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
