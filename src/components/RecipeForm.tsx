import React, { useState } from 'react';
import { NewRecipe } from '../types/recipe';

interface RecipeFormProps {
  onSubmit: (recipe: NewRecipe) => void;
  isSubmitting: boolean;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit, isSubmitting }) => {
  const [recipe, setRecipe] = useState<NewRecipe>({
    name: '',
    ingredients: '',
    instructions: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRecipe(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(recipe);
    setRecipe({ name: '', ingredients: '', instructions: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Add New Recipe</h2>
      
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Recipe Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={recipe.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-1">
          Ingredients
        </label>
        <textarea
          id="ingredients"
          name="ingredients"
          value={recipe.ingredients}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          rows={3}
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">
          Instructions
        </label>
        <textarea
          id="instructions"
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          rows={4}
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Adding...' : 'Add Recipe'}
      </button>
    </form>
  );
};

export default RecipeForm;