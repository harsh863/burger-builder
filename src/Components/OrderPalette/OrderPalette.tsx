import React, {Component} from "react";
import {Order} from "../../Models/order.model";
import './OrderPalette.scss';
import {BurgerDisplayWindow} from "../BurgerDisplayWindow/BurgerDisplayWindow";

export class OrderPalette extends Component<OrderPaletteProps> {

    getParsedIngredients = () => {
        // @ts-ignore
        return Object.keys(this.props.order.ingredients).map(key => `${key} (${this.props.order.ingredients[key]})`)
    }

    render() {
        return (
            <div className="order-palette">
                <div className="order-palette__details">
                    <div className="order-palette__details__ingredients-block">
                        Burger Ingredients:
                        {this.getParsedIngredients().map(chipContent => <span key={chipContent} className="order-palette__details__ingredients-block__ingredient_chip">{chipContent}</span>)}
                    </div>
                    <div className="order-palette__details__price-block">
                        <p>Total Price: <strong>₹ {this.props.order.price.toFixed(2)}</strong></p>
                    </div>
                </div>
                <div className="order-palette__burger-overview">
                    <BurgerDisplayWindow ingredients={this.props.order.ingredients} smallView />
                </div>
            </div>
        );
    }
}

interface OrderPaletteProps {
    order: Order;
}