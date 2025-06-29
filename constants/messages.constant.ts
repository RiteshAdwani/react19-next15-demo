/**
 * Application message constants for consistent user communication
 */
export const MESSAGES = {
  /**
   * Success messages for operations
   */
  SUCCESS: {
    RECIPE_CREATED: "Recipe created successfully!",
    RECIPE_UPDATED: "Recipe updated successfully!",
    RECIPE_DELETED: "Recipe deleted successfully",
    LOGIN_SUCCESS: "Login successful!",
    REGISTRATION_SUCCESS: "Registration successful!",
    LOGOUT_SUCCESS: "Logged out successfully",
  },

  /**
   * Error messages for form validation
   */
  ERROR: {
    VALIDATION_FAILED: "Validation failed",
    INVALID_INPUT: "Invalid input format",
    REQUIRED_FIELDS: "All fields are required",
    NO_RECIPE_ID: "No recipe ID provided",
    INVALID_RECIPE_ID: "Invalid recipe ID format",
    COULD_NOT_CREATE_RECIPE: "Couldn't create recipe",
    COULD_NOT_DELETE_RECIPE: "Couldn't delete recipe",
  },

  /**
   * Authentication error messages
   */
  AUTH: {
    LOGIN_REQUIRED: "You must be logged in to create a recipe",
    AUTHENTICATION_REQUIRED: "Authentication required",
    INVALID_CREDENTIALS: "Invalid email or password",
    USER_EXISTS: "User with this email already exists",
    LOGIN_FAILED: "Login failed. Please try again.",
    REGISTRATION_FAILED: "Registration failed. Please try again.",
    LOGOUT_FAILED: "Logout failed. Please try again.",
    UNAUTHORIZED_DELETE: "You can only delete your own recipes",
    UNAUTHORIZED_EDIT: "You can only edit your own recipes",
    AUTH_ERROR: "Auth Error:",
  },

  /**
   * Recipe operation messages
   */
  RECIPE: {
    LIKE_LOGIN_REQUIRED: "Please log in to like recipes",
    DELETE_CONFIRMATION: "Are you sure you want to delete this recipe?",
    UNLIKE_TOOLTIP: "Unlike this recipe",
    LIKE_TOOLTIP: "Like this recipe",
    DELETE_ERROR_PREFIX: "Failed to delete:",
    DELETE_ERROR_GENERIC: "An error occurred while deleting the recipe",
  },

  /**
   * Error messages for database operations
   */
  DB_ERROR: {
    RECIPE_NOT_FOUND: "Recipe not found",
    CREATE_FAILED: "Failed to create recipe",
    UPDATE_FAILED: "Failed to update recipe",
    DELETE_FAILED: "Failed to delete recipe",
    UNEXPECTED: "An unexpected error occurred",
    CONNECTION_ERROR: "Database connection error",
  },

  /**
   * Loading and status messages
   */
  STATUS: {
    LOADING: "Loading...",
    SIGNING_IN: "Signing in...",
    DELETING: "Deleting...",
    CREATING: "Creating...",
    UPDATING: "Updating...",
    SAVING: "Saving...",
  },

  /**
   * UI text and labels
   */
  UI: {
    SAVE_RECIPE: "Save Recipe",
    DELETED_STATUS: "Deleted!",
    LIKED_TEXT: "Liked",
    LIKE_TEXT: "Like",
  },
};
