import React, {Component} from "react";
import {Ingredients} from "../../../enum/ingredients.enum";
import './BurgerIngredient.scss';

export class BurgerIngredient extends Component<BurgerIngredientProps> {

    ingredientName: string = this.props.type;
    classes: string = '';
    ingredients: string[] = Object.values(Ingredients);

    render() {
        if (this.ingredientName === Ingredients.TOP_BREAD) {
            return (
                <div className='top-bread'>
                    <div className='seeds-1'/>
                    <div className='seeds-2'/>
                </div>
            );
        } else if (this.ingredients.includes(this.ingredientName)) {
            this.classes = this.ingredientName;
            return <div className={this.classes} />;
        } else {
            return null;
        }
    }
}

interface BurgerIngredientProps{
    type: string;
}