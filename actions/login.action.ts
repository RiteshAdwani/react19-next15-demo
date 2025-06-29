"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createToken } from "@/utils/createToken";
import bcrypt from "bcrypt";
import { AuthActionState } from "@/types/auth.types";
import { loginSchema } from "@/schemas/auth.schema";
import { MESSAGES } from "@/constants/messages.constant";
import { AUTH_TOKEN } from "@/constants/shared.constant";
import { navigationRoutes } from "@/constants/navigationRoutes.constant";

/**
 * @description Handles user login action, validates credentials with Zod, and sets authentication token in cookies.
 */
export async function loginAction(
  _prevState: AuthActionState | null,
  formData: FormData
): Promise<AuthActionState> {
  try {
    // Extract form data as object
    const formDataObj = Object.fromEntries(formData.entries());

    // Validate with Zod schema
    const validationResult = loginSchema.safeParse(formDataObj);

    if (!validationResult.success) {
      // Get first error message or default
      const errorMessage =
        validationResult.error.errors[0]?.message ||
        MESSAGES.ERROR.VALIDATION_FAILED;
      return { error: errorMessage };
    }

    // Extract validated data
    const { email, password } = validationResult.data;

    try {
      // Find user in database
      const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true, name: true, email: true, password: true },
      });

      // Check if user exists
      if (!user) {
        return { error: MESSAGES.AUTH.INVALID_CREDENTIALS };
      }

      // Compare password with hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return { error: MESSAGES.AUTH.INVALID_CREDENTIALS };
      }

      // Create token and set cookie
      const token = createToken({
        id: user.id,
        name: user.name,
        email: user.email,
      });

      const cookieStore = await cookies();
      cookieStore.set(AUTH_TOKEN, token, {
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        httpOnly: true, // More secure
      });
    } catch {
      return { error: MESSAGES.AUTH.LOGIN_FAILED };
    }

    // Only redirect if successful (no errors)
    redirect(navigationRoutes.home);
  } catch {
    return { error: MESSAGES.AUTH.LOGIN_FAILED };
  }
}
