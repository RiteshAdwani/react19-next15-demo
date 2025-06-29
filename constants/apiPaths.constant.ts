export const apiPaths = {
  getRecipes: `${process.env.NEXT_PUBLIC_API_URL}/api/recipes`,
  recipeDetails: (recipeId: string) =>
    `${process.env.NEXT_PUBLIC_API_URL}/api/recipes/${recipeId}`,
};
