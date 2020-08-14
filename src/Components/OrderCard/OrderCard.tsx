import React, {Component} from "react";
import {Ingredient} from "../../Models/ingredient.model";
import {Button, LinearProgress} from "@material-ui/core";
import './OrderCard.scss';
import {Modal} from "../../Helper/Modal/Modal";
import CloseIcon from '@material-ui/icons/Close';

class OrderCard extends Component<OrderCardProps> {

    getIngredientSummary = () => {
        return Object.keys(this.props.ingredients).map(key => {
            return (
                // @ts-ignore
                <li key={key + Math.random()}><span style={{ textTransform: 'capitalize' }}>{key}</span>: {this.props.ingredients[key]}</li>
            )
        });
    }

    render() {
        return (
            <Modal open={this.props.show} onClose={this.props.onClose}>
                <div className='order-card'>
                    <div className='order-card__close-icon' onClick={this.props.onClose}>
                        <CloseIcon/>
                    </div>
                    <h3>Your Order</h3>
                    <p>A delicious burger with the following ingredients:</p>
                    <ul>{this.getIngredientSummary()}</ul>
                    <p><strong>Total Price: ₹ {this.props.price.toFixed(2)}</strong></p>
                    <div className='order-card__button-row'>
                        <Button className="danger" size='medium'
                                onClick={this.props.onClose} disabled={this.props.requestInProgress}>Cancel</Button>
                        <Button className="success" size='medium'
                                onClick={this.props.onOrder} disabled={this.props.requestInProgress}>Continue</Button>
                    </div>
                    {this.props.requestInProgress ? <LinearProgress style={{marginTop: '10px', borderRadius: '10px'}} color='primary'/> : null}
                </div>
            </Modal>
        );
    }
}

export default OrderCard;

interface OrderCardProps{
    ingredients: Ingredient;
    price: number;
    show: boolean;
    requestInProgress: boolean;
    onClose: (event: any) => void;
    onOrder: (event: any) => void;
}