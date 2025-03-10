import axios from "../Utils/AxiosInstance";
import { Recipe, NewRecipe } from "../types/recipe";

export const recipeService = {
  getAll: async (): Promise<Recipe[]> => {
    const response = await axios.get<{ recipes: Recipe[] }>("/recipes");
    return response.data.recipes;
  },

  create: async (recipe: NewRecipe): Promise<Recipe> => {
    const response = await axios.post<Recipe>("/recipes", recipe);
    return response.data;
  },

  update: async (recipe: Recipe): Promise<Recipe> => {
    const response = await axios.put<Recipe>(`/recipes/${recipe.id}`, recipe);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`/recipes/${id}`);
  },
};
