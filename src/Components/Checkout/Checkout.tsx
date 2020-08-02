import React, {Component} from "react";
import {Ingredient} from "../../models/ingredient.model";
import {Button} from "@material-ui/core";
import {BurgerDisplayWindow} from "../BurgerDisplayWindow/BurgerDisplayWindow";
import './Checkout.scss';

export class Checkout extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    }
    render() {
        return (
            <div className='checkout'>
                <h1 className="main-text">We hope it tastes well!</h1>
                <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <BurgerDisplayWindow ingredients={this.state.ingredients} />
                    <div className="button-row">
                        <Button color='secondary' size='medium'>Cancel</Button>
                        <Button  color='primary' size='medium'>Continue</Button>
                    </div>
                </div>
            </div>
        );
    }
}

interface CheckoutProps {
    ingredients: Ingredient;
}