"use server";

import prisma from "@/lib/prisma";
import { createToken } from "@/utils/createToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { AuthActionState } from "@/types/auth.types";
import { registerSchema } from "@/schemas/auth.schema";
import { MESSAGES } from "@/constants/messages.constant";
import { AUTH_TOKEN } from "@/constants/shared.constant";
import { navigationRoutes } from "@/constants/navigationRoutes.constant";

/**
 * @description Handles user registration action, validates input with Zod, hashes password, and creates a new user in the database.
 */
export async function registerAction(
  _prevState: AuthActionState | null,
  formData: FormData
): Promise<AuthActionState> {
  try {
    // Extract form data as object
    const formDataObj = Object.fromEntries(formData.entries());

    // Validate with Zod schema
    const validationResult = registerSchema.safeParse(formDataObj);

    if (!validationResult.success) {
      // Get first error message or default
      const errorMessage =
        validationResult.error.errors[0]?.message ||
        MESSAGES.ERROR.VALIDATION_FAILED;
      return { error: errorMessage };
    }

    // Extract validated data
    const { email, password, name } = validationResult.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: MESSAGES.AUTH.USER_EXISTS };
    }

    // Hash the password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user with hashed password
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
      select: { id: true, name: true, email: true },
    });

    // Create token and set cookie
    const token = createToken(user);

    const cookieStore = await cookies();
    cookieStore.set(AUTH_TOKEN, token, {
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      httpOnly: true,
    });

    // Only redirect if successful (no errors)
    redirect(navigationRoutes.home);
  } catch {
    return { error: MESSAGES.AUTH.REGISTRATION_FAILED };
  }
}
