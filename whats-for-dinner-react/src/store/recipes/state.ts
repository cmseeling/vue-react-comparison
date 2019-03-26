import { IDictionary, Dictionary } from "../../utils/Dictionary";
import { Recipe } from "../../models/recipe";

export interface IRecipesState {
    recipes: IDictionary<Recipe>;
}

export const DefaultRecipesState = (): IRecipesState => {
    const recipes = new Dictionary<Recipe>();
    return {
        recipes
    };
}