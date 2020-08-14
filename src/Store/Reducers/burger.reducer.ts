import {BurgerStore} from "../../Models/burger-store.model";
import {StoreAction} from "../../Models/store-action.model";
import {StoreActions} from "../../Enum/store-actions.enum";
import {Ingredient} from "../../Models/ingredient.model";
import {Prices} from "../../Enum/prices.enum";
import {Ingredients} from "../../Enum/ingredients.enum";

export const burgerReducer = (state: BurgerStore = getBurgerInitialState(), action: StoreAction): BurgerStore => {
    switch (action.type) {
        case StoreActions.ADD_INGREDIENT: return addIngredient(state, action);
        case StoreActions.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case StoreActions.INITIALISE_BURGER: return getBurgerInitialState();
        default: return state;
    }
}

const addIngredient = (state: BurgerStore, action: StoreAction): BurgerStore => {
    const oldCount = (state.ingredients as any)[action.payload.ingredientName];
    const updatedIngredient = { ...state.ingredients, [action.payload.ingredientName]: oldCount + 1 };
    return { ...state, ingredients: updatedIngredient, price: getEvaluatedBurgerPrice(updatedIngredient) };
}

const removeIngredient = (state: BurgerStore, action: StoreAction): BurgerStore => {
    const oldCount = (state.ingredients as any)[action.payload.ingredientName];
    const updatedIngredient = { ...state.ingredients, [action.payload.ingredientName]: oldCount > 0 ? oldCount - 1 : 0 };
    return { ...state, ingredients: updatedIngredient, price: getEvaluatedBurgerPrice(updatedIngredient) };
}

const getEvaluatedBurgerPrice = (ingredient?: Ingredient): number => {
    let price = Prices.TOP_BREAD + Prices.BOTTOM_BREAD + Prices.EXTRA;
    ingredient && Object.entries(ingredient).forEach(obj => {
        // @ts-ignore
        const ing_key: Prices = Object.keys(Ingredients).find(key => Ingredients[key] === obj[0]);
        price += obj[1] * (+Prices[ing_key]);
    });
    return price;
}

const getBurgerInitialState = (): BurgerStore => {
    return {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        price: getEvaluatedBurgerPrice()
    }
}