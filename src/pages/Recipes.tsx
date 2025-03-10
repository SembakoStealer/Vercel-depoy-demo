import React, { useState } from 'react';
import {useMutation} from '@tanstack/react-query';
import RecipeForm from '../components/RecipeForm';
import RecipeCard from '../components/RecipeCard';
import RecipeSkeleton from '../components/RecipeSkeleton';
import { Recipe, NewRecipe } from '../types/recipe';

const RecipePage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  
  // Create mutation
  const createMutation = useMutation({
    mutationFn: (newRecipe: NewRecipe) => {
      // Create a new recipe with a unique ID (simulating API)
      const createdRecipe: Recipe = {
        ...newRecipe,
        id: Date.now(), // Using timestamp as a simple unique ID
      };
      
      return Promise.resolve(createdRecipe);
    },
    onSuccess: (newRecipe) => {
      setRecipes(prevRecipes => [newRecipe, ...prevRecipes]);
    },
  });
  
  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (updatedRecipe: Recipe) => {
      // Simulating API update
      return Promise.resolve(updatedRecipe);
    },
    onSuccess: (updatedRecipe) => {
      setRecipes(prevRecipes => 
        prevRecipes.map(recipe => 
          recipe.id === updatedRecipe.id ? updatedRecipe : recipe
        )
      );
    },
  });
  
  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      // Simulating API delete
      return Promise.resolve(id);
    },
    onSuccess: (deletedId) => {
      setRecipes(prevRecipes => 
        prevRecipes.filter(recipe => recipe.id !== deletedId)
      );
    },
  });

  const handleCreateRecipe = (newRecipe: NewRecipe) => {
    createMutation.mutate(newRecipe);
  };

  const handleUpdateRecipe = (updatedRecipe: Recipe) => {
    updateMutation.mutate(updatedRecipe);
  };

  const handleDeleteRecipe = (id: number) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">My Recipes</h1>
      
      <RecipeForm 
        onSubmit={handleCreateRecipe} 
        isSubmitting={createMutation.isPending} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {createMutation.isPending ? (
          // Show skeletons while loading
          Array.from({ length: 2 }).map((_, index) => (
            <RecipeSkeleton key={index} />
          ))
        ) : recipes.length > 0 ? (
          // Show recipe cards
          recipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onUpdate={handleUpdateRecipe}
              onDelete={handleDeleteRecipe}
              isDeleting={deleteMutation.isPending && deleteMutation.variables === recipe.id}
            />
          ))
        ) : (
          // No recipes state
          <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">No recipes yet. Add your first recipe above!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipePage;