import React, {Component} from "react";
import {Order} from "../../Models/order.model";
import './OrderPalette.scss';
import {BurgerDisplayWindow} from "../BurgerDisplayWindow/BurgerDisplayWindow";
import {MenuItem, Menu} from "@material-ui/core";

export class OrderPalette extends Component<OrderPaletteProps, OrderPaletteState> {
    state = {
        openMenu: false,
        mouseX: 0,
        mouseY: 0
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

    deleteOrder = () => {
        this.closeContextMenu();
        if (this.props.order.id) {
            this.props.onDelete(this.props.order?.id);
        }
    }

    render() {
        return (
            <React.Fragment>
                <div onContextMenu={this.openContextMenu} style={{ cursor: 'context-menu' }} className="order-palette">
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
                <Menu
                    keepMounted open={this.state.openMenu} onClose={this.closeContextMenu} className="delete-order"
                    anchorReference="anchorPosition"
                    anchorPosition={{ top: this.state.mouseY, left: this.state.mouseX }}>
                    <MenuItem onClick={this.deleteOrder}>Delete Order</MenuItem>
                </Menu>
            </React.Fragment>
        );
    }
}

interface OrderPaletteProps {
    order: Order;
    onDelete: (id: string) => void;
}

interface OrderPaletteState {
    openMenu: boolean;
    mouseX: number;
    mouseY: number;
}