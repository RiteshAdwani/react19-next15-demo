import { MESSAGES } from "@/constants/messages.constant";
import { AUTH_TOKEN } from "@/constants/shared.constant";
import { prisma } from "@/lib/prisma";
import { User } from "@/shared/types";
import { cookies } from "next/headers";

/**
 * @description Retrieves the currently authenticated user based on the auth token stored in cookies.
 * @returns {Promise<User | null>} The user object if authenticated, otherwise null.
 */
export async function getUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_TOKEN)?.value;

    if (!token) return null;

    const payload = JSON.parse(atob(token.split(".")[1]));

    if (payload.exp < Date.now() / 1000) return null;

    // Verify user exists in database with timeout handling
    const user = await Promise.race([
      prisma.user.findUnique({
        where: { id: payload.userId },
        select: { id: true, name: true, email: true },
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Database timeout")), 5000)
      ),
    ]);

    return user as User | null;
  } catch (error) {
    console.error(MESSAGES.AUTH.AUTH_ERROR, error);
    // Return null on any error (including timeouts) to allow app to function
    return null;
  }
}
