import React, {Component} from "react";
import {BurgerIngredient} from "./BurgerIngredient/BurgerIngredient";
import {Ingredients} from "../../Enum/ingredients.enum";
import './BurgerDisplayWindow.scss';
import {Ingredient} from "../../Models/ingredient.model";

export class BurgerDisplayWindow extends Component<BurgerProps>{

    getMiddleIngredients = () => {
        const middleIngredients: any[] = [];
        const ingredients: Ingredient = this.props.ingredients;
        !!this.props.ingredients && Object.keys(this.props.ingredients).forEach(key => {
            // @ts-ignore
            const ing_name: 'salad' | 'cheese' | 'bacon' | 'meat' = key;
            Array.from(Array(ingredients[ing_name])).forEach(_ => {
                middleIngredients.push(<BurgerIngredient key={Math.random()} type={ing_name}/>)
            });
        });
        return middleIngredients;
    }


    render() {
        const middleIngredients = this.getMiddleIngredients();
        return (
            <div className={!this.props.smallView ? 'burger' : 'burger-small-view'}>
                <BurgerIngredient type={Ingredients.TOP_BREAD} />
                {
                    middleIngredients.length ?
                        middleIngredients : !this.props.smallView ? <p className='no-ingredient-text'>Please start adding ingredients!</p> : null
                }
                <BurgerIngredient type={Ingredients.BOTTOM_BREAD} />
            </div>
        )
    }
}

interface BurgerProps{
    ingredients: Ingredient;
    smallView?: boolean;
}