"use server";

import { navigationRoutes } from "@/constants/navigationRoutes.constant";
import { AUTH_TOKEN } from "@/constants/shared.constant";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * @description Handles user logout action by deleting the authentication token from cookies.
 */
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_TOKEN);
  redirect(navigationRoutes.login);
}
