import React, {Component} from "react";
import {Ingredient} from "../../Models/ingredient.model";
import {IngredientController} from "./IngredientController/IngredientController";
import './IngredientsController.scss';

export class IngredientsController extends Component<IngredientsControllerProps> {
    getIngredientsControlPanel = () => {
        // @ts-ignore
        return Object.keys(this.props.ingredients).map(name => <IngredientController key={name + Math.random()} ingredientName={name} ingredientQuantity={this.props.ingredients[name]} />);
    }

    render() {
        const totalIngredientsQuantity = Object.values(this.props.ingredients).reduce((p, c) => p + c, 0);
        return (
            <div className='control-container'>
                <p>Current Price: <strong>₹ {this.props.price.toFixed(2)}</strong></p>
                <div className='control-container__control-panel'>{this.getIngredientsControlPanel()}</div>
                <button
                    className='control-container__order-button'
                    disabled={totalIngredientsQuantity === 0}
                    onClick={this.props.order}>ORDER NOW</button>
            </div>
        );
    }
}

interface IngredientsControllerProps{
    ingredients: Ingredient,
    price: number,
    order: () => void
}