export const navigationRoutes = {
  home: "/",
  login: "/auth/login",
  register: "/auth/register",
  createRecipe: "/recipes/new",
  demo: "/demo",
  recipeDetails: (recipeId: string) => `/recipes/${recipeId}`,
  editRecipe: (recipeId: string) => `/recipes/${recipeId}/edit`,
};
