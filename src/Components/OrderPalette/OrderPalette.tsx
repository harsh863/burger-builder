import React, {Component, Fragment} from "react";
import {Order} from "../../Models/order.model";
import './OrderPalette.scss';
import {BurgerDisplayWindow} from "../BurgerDisplayWindow/BurgerDisplayWindow";
import {MenuItem, Menu} from "@material-ui/core";
import {Ingredient} from "../../Models/ingredient.model";
import moment from 'moment';
import {Invoice} from "../Invoice/Invoice";

export class OrderPalette extends Component<OrderPaletteProps, OrderPaletteState> {
    state = {
        openMenu: false,
        mouseX: 0,
        mouseY: 0,
        isDelivered: true,
        showInvoice: false
    }

    getIngredientsInCorrectOrder = (): Ingredient => {
        return {
            salad: this.props.order.ingredients.salad,
            bacon: this.props.order.ingredients.bacon,
            cheese: this.props.order.ingredients.cheese,
            meat: this.props.order.ingredients.meat
        }
    }

    componentDidMount() {
        const currentTime = moment(new Date());
        const difference_from_delivery = moment(this.props.order.delivery_time).diff(currentTime, 'minutes');
          if (difference_from_delivery >= 1) {
            setTimeout(_ => this.setState({isDelivered: true}), (difference_from_delivery - 1) * 60 * 1000);
        }
        this.setState({isDelivered: difference_from_delivery < 1});
    }

    getParsedIngredients = () => {
        // @ts-ignore
        return Object.keys(this.props.order.ingredients).filter(key => this.props.order.ingredients[key] > 0).map(key => `${key} (${this.props.order.ingredients[key]})`)
    }

    openContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        this.setState({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
            openMenu: true
        });
    };

    closeContextMenu = () => {
        this.setState({openMenu: false});
    };

    deleteOrder = (isDelete: boolean) => {
        this.closeContextMenu();
        if (this.props.order.id) {
            this.props.onDelete(this.props.order?.id, isDelete);
        }
    }

    generateInvoice = () => {
        this.setState({openMenu: false, showInvoice: true});
    }

    onInvoiceWindowClose = (event: any) => {
        this.setState({showInvoice: false});
    }

    getDeliveryStatus = (delivery_time: Date, order_time: Date): any => {
        const currentTime = moment(new Date());
        const difference_from_delivery = moment(delivery_time).diff(currentTime, 'minutes');
        const difference_from_order = moment(currentTime).diff(order_time, 'minutes');
        if (difference_from_order <= 10) {
            return <div className="status"><strong style={{color: 'grey'}}>Packing</strong> <img src="https://img.icons8.com/material-two-tone/20/000000/packing.png" alt=""/></div>;
        } else if (difference_from_delivery > 5) {
            return <div className="status"><strong style={{color: 'cadetblue'}}>Arriving in {difference_from_delivery} minutes</strong> <img src="https://img.icons8.com/plasticine/20/000000/in-transit.png" alt=""/></div>;
        } else if (difference_from_delivery <= 5 && difference_from_delivery > 0) {
            return <div className="status"><strong style={{color: 'red'}}>Arrived at your location</strong> <img src="https://img.icons8.com/doodle/20/000000/user-location.png" alt=""/></div>;
        } else if (difference_from_delivery < 1) {
            return <div className="status"><strong style={{color: 'green'}}>Delivered</strong> <img src="https://img.icons8.com/color/20/000000/data-arrived.png" alt=""/></div>;
        }
    }

    render() {
        return (
            <Fragment>
                <div onContextMenu={this.openContextMenu} style={{ cursor: 'context-menu' }} className="order-palette">
                    <div className="order-palette__details">
                        <div className="order-palette__details__ingredients-block">
                            Burger Ingredients:
                            {this.getParsedIngredients().map(chipContent => <span key={chipContent} className="order-palette__details__ingredients-block__ingredient_chip">{chipContent}</span>)}
                        </div>
                        <div className="order-palette__details__price-block">
                            <p>Total Price: </p><strong>₹ {this.props.order.price.toFixed(2)}</strong>
                        </div>
                        <div className="order-palette__details__status-block">
                            <p>Delivery Status: </p>{this.getDeliveryStatus(this.props.order.delivery_time, this.props.order.order_time)}
                        </div>
                    </div>
                    <div className="order-palette__burger-overview">
                        <BurgerDisplayWindow ingredients={this.getIngredientsInCorrectOrder()} smallView />
                    </div>
                </div>
                <Menu
                    keepMounted open={this.state.openMenu} onClose={this.closeContextMenu} className="delete-order"
                    anchorReference="anchorPosition"
                    anchorPosition={{ top: this.state.mouseY, left: this.state.mouseX }}>
                    {
                        this.state.isDelivered ?
                            [ <MenuItem key={1} onClick={event => this.deleteOrder(true)}>Delete Order</MenuItem>, <MenuItem key={2} onClick={event => this.generateInvoice()}>Generate Invoice</MenuItem>] :
                            <MenuItem onClick={event => this.deleteOrder(false)}>Cancel Order</MenuItem>
                    }
                </Menu>
                {
                    this.state.showInvoice ?
                        <Invoice open={this.state.showInvoice} order={this.props.order} onClose={this.onInvoiceWindowClose} /> : null
                }
            </Fragment>
        );
    }
}

interface OrderPaletteProps {
    order: Order;
    onDelete: (id: string, isDelete: boolean) => void;
}

interface OrderPaletteState {
    openMenu: boolean;
    mouseX: number;
    mouseY: number;
    isDelivered: boolean;
    showInvoice: boolean;
}