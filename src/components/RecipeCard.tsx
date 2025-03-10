import React, { useState } from "react";
import { Recipe } from "../types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
  onUpdate: (recipe: Recipe) => void;
  onDelete: (id: number) => void;
  isDeleting: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onUpdate,
  onDelete,
  isDeleting,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState(recipe);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    onUpdate(editedRecipe);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedRecipe(recipe);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recipe Name
          </label>
          <input
            type="text"
            name="name"
            value={editedRecipe.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ingredients
          </label>
          <textarea
            name="ingredients"
            value={editedRecipe.ingredients}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={3}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instructions
          </label>
          <textarea
            name="instructions"
            value={editedRecipe.instructions}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={4}
          />
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>

      <div className="mb-3">
        <h4 className="font-medium text-gray-700">Ingredients:</h4>
        <p className="text-gray-600 whitespace-pre-line">
          {recipe.ingredients}
        </p>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-gray-700">Instructions:</h4>
        <p className="text-gray-600 whitespace-pre-line">
          {recipe.instructions}
        </p>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(recipe.id)}
          disabled={isDeleting}
          className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 disabled:opacity-50"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
