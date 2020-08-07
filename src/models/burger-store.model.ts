import {Ingredient} from "./ingredient.model";

export interface BurgerStore {
    ingredients: Ingredient;
    price: number;
}