import {StoreActions} from "../../Enum/store-actions.enum";
import {StoreAction} from "../../Models/store-action.model";

export const addIngredient = (ingredientName: string): StoreAction => ({
    type: StoreActions.ADD_INGREDIENT,
    payload: {ingredientName: ingredientName}
});

export const removeIngredient = (ingredientName: string): StoreAction => ({
    type: StoreActions.REMOVE_INGREDIENT,
    payload: {ingredientName: ingredientName}
});

export const initialiseBurger = (): StoreAction => ({
    type: StoreActions.INITIALISE_BURGER
});