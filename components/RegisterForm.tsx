"use client";

import { useActionState, useRef } from "react";
import Form from "next/form";
import { registerAction } from "@/actions/register.action";
import { AuthActionState } from "@/types/auth.types";
import Link from "next/link";
import ActionButton from "./ActionButton";
import { navigationRoutes } from "@/constants/navigationRoutes.constant";

/**
 * @description RegisterForm component for user registration.
 */
export default function RegisterForm() {
  const [state, formAction, pending] = useActionState<
    AuthActionState,
    FormData
  >(registerAction, { error: undefined, success: undefined });

  // React 19: ref as prop for button focus management
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>

        <Form action={formAction} className="mt-8 space-y-6">
          {state?.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {state.error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                disabled={pending}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={pending}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password (minimum 6 characters)
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                disabled={pending}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your password (min 6 characters)"
              />
            </div>
          </div>

          <div>
            {/* React 19: ActionButton with ref as prop */}
            <ActionButton
              ref={submitButtonRef} // React 19: ref as prop!
              type="submit"
              variant="primary"
              loading={pending}
              className="w-full"
            >
              Register
            </ActionButton>
          </div>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href={navigationRoutes.login}
                className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
              >
                Sign in
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}
