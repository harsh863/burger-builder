import React, {Component} from "react";
import {IngredientControllerContext} from "../../../Context/IngredientControllerContext";
import './IngredientController.scss';

export class IngredientController extends Component<IngredientControllerProps>{
    static contextType = IngredientControllerContext;

    convertWordToTitleCase = (word: string): string => {
        return word.charAt(0).toUpperCase() + word.slice(1, );
    }

    render() {
        return (
            <div className='ingredient-control'>
                <div className='label'>{this.convertWordToTitleCase(this.props.ingredientName)}</div>
                <button
                    className='control-button decrement-button'
                    onClick={_ => this.context.removeIngredient(this.props.ingredientName)}
                    disabled={this.props.ingredientQuantity === 0}>Less</button>
                <button
                    className='control-button increment-button'
                    onClick={_ => this.context.addIngredient(this.props.ingredientName)}>More</button>
            </div>
        );
    }
}

interface IngredientControllerProps{
    ingredientName: string;
    ingredientQuantity: number;
}