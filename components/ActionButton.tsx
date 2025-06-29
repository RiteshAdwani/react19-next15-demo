"use client";

import { ComponentProps } from "react";
import { MESSAGES } from "@/constants/messages.constant";

interface ActionButtonProps extends ComponentProps<"button"> {
  variant?: "primary" | "secondary" | "danger" | "success";
  loading?: boolean;
  ref?: React.Ref<HTMLButtonElement>; // React 19: ref as prop!
}

/**
 * @description A versatile action button component with multiple styles and loading state.
 */
export default function ActionButton({
  children,
  variant = "primary",
  loading = false,
  ref,
  className = "",
  disabled,
  ...props
}: ActionButtonProps) {
  const baseClasses =
    "relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 cursor-pointer disabled:cursor-not-allowed transform hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500/50 disabled:from-blue-300 disabled:to-indigo-300 disabled:transform-none disabled:shadow-md",
    secondary:
      "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300 focus:ring-gray-500/50 disabled:from-gray-100 disabled:to-gray-200 disabled:transform-none disabled:shadow-md border border-gray-300",
    danger:
      "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 focus:ring-red-500/50 disabled:from-red-300 disabled:to-pink-300 disabled:transform-none disabled:shadow-md",
    success:
      "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 focus:ring-emerald-500/50 disabled:from-emerald-300 disabled:to-green-300 disabled:transform-none disabled:shadow-md",
  };

  return (
    <button
      ref={ref} // React 19: Direct ref prop usage - no forwardRef wrapper!
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          {MESSAGES.STATUS.LOADING}
        </div>
      ) : (
        children
      )}
    </button>
  );
}
