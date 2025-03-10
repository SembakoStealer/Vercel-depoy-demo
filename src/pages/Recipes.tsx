import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../Utils/AxiosInstance";
import { useState } from "react";

// Define the Recipe interface
interface Recipe {
  id: number;
  name: string;
  ingredients: string;
  instructions: string;
}

// Fetch all recipes
const fetchRecipes = async () => {
  return await axios.get<{ recipes: Recipe[] }>("/recipes");
};

// Create a new recipe
const createRecipe = async (newRecipe: { name: string; ingredients: string; instructions: string }) => {
  return await axios.post("/recipes", newRecipe);
};

// Update an existing recipe
const updateRecipe = async (updatedRecipe: Recipe) => {
  return await axios.put(`/recipes/${updatedRecipe.id}`, updatedRecipe);
};

// Delete a recipe
const deleteRecipe = async (id: number) => {
  return await axios.delete(`/recipes/${id}`);
};

// Skeleton Loader
const RecipeSkeleton = () => {
  return (
    <div className="group relative p-4 border rounded-md shadow-md">
      <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
      <div className="mt-2 h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
    </div>
  );
};

// Main Recipe Component
const Recipe = () => {
  const queryClient = useQueryClient();
  const [newRecipe, setNewRecipe] = useState({ name: "", ingredients: "", instructions: "" });

  // Fetch Recipes
  const { data, isFetching } = useQuery({
    queryKey: ["recipes"],
    queryFn: fetchRecipes,
  });

  // Create Mutation
  const createMutation = useMutation({
    mutationFn: createRecipe,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["recipes"] }),
  });

  // Update Mutation
  const updateMutation = useMutation({
    mutationFn: updateRecipe,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["recipes"] }),
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["recipes"] }),
  });

  // Handle Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(newRecipe);
    setNewRecipe({ name: "", ingredients: "", instructions: "" });
  };

  return (
    <div className="container mx-auto px-4">
      {/* Add New Recipe */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-md">
        <h2 className="text-xl font-bold mb-4">Add New Recipe</h2>
        <input
          type="text"
          placeholder="Recipe Name"
          value={newRecipe.name}
          onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          placeholder="Ingredients"
          value={newRecipe.ingredients}
          onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          placeholder="Instructions"
          value={newRecipe.instructions}
          onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create Recipe
        </button>
      </form>

      {/* Recipes List */}
      <div className="grid grid-cols-1 gap-4">
        {isFetching
          ? Array.from({ length: 4 }).map((_, index) => <RecipeSkeleton key={index} />)
          : data?.data.recipes.map((recipe) => (
              <div key={recipe.id} className="p-4 border rounded-md shadow-md">
                <h3 className="text-lg font-bold">{recipe.name}</h3>
                <p className="text-gray-600"><strong>Ingredients:</strong> {recipe.ingredients}</p>
                <p className="text-gray-600"><strong>Instructions:</strong> {recipe.instructions}</p>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() =>
                      updateMutation.mutate({ ...recipe, instructions: "Updated Instructions" })
                    }
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(recipe.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Recipe;
