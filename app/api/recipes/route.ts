import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { MESSAGES } from "@/constants/messages.constant";

/**
 * @description API route to fetch all recipes
 */
export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(recipes);
  } catch {
    return NextResponse.json(
      { error: MESSAGES.DB_ERROR.UNEXPECTED },
      { status: 500 }
    );
  }
}
