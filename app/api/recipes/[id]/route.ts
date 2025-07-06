import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { MESSAGES } from "@/constants/messages.constant";

/**
 * @description API route to fetch a specific recipe by ID
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Async request to ensure params are fully resolved
    const resolvedParams = await params;
    const recipe = await prisma.recipe.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!recipe) {
      return NextResponse.json(
        { error: MESSAGES.DB_ERROR.RECIPE_NOT_FOUND },
        { status: 404 }
      );
    }

    return NextResponse.json(recipe);
  } catch {
    return NextResponse.json(
      { error: MESSAGES.DB_ERROR.UNEXPECTED },
      { status: 500 }
    );
  }
}
