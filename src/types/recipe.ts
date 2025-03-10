export interface Recipe {
    id: number;
    name: string;
    ingredients: string;
    instructions: string;
  }
  
  export type NewRecipe = Omit<Recipe, 'id'>;