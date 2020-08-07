import React, {Component} from "react";
import {Ingredient} from "../../models/ingredient.model";
import {Button} from "@material-ui/core";
import {BurgerDisplayWindow} from "../../Components/BurgerDisplayWindow/BurgerDisplayWindow";
import './Checkout.scss';
import {Prompt, RouteComponentProps} from "react-router";
import {RoutePaths} from "../../enum/route-paths.enum";
import {Header} from "../Header/Header";
import {BurgerStore} from "../../models/burger-store.model";
import {OrdersStore} from "../../models/orders-store.model";
import {connect} from "react-redux";
import {PartialOrder} from "../../models/order.model";
import * as actions from '../../Store/Actions/combined-action';

class Checkout extends Component<CheckoutProps,CheckoutState> {
    state = { showPrompt: true };

    componentDidMount() {
        const ingredientCount = Object.values(this.props.draftOrder.ingredients).reduce((a, b) => a + b, 0);
        if (ingredientCount < 1) {
            this.setState({showPrompt: false});
            setTimeout(() => this.props.history.replace(RoutePaths.NOT_FOUND));
        }
    }

    onCancelClicked = () => {
        this.props.history.replace(RoutePaths.BURGER_BUILDER);
    }

    onContinueClicked = () => {
        this.setState({showPrompt: false});
        this.props.modifyDraftBurgerOrder({...this.props.draftOrder});
        setTimeout(() => this.props.history.replace(RoutePaths.DELIVERY_DATA));
    }

    render() {
        // @ts-ignore
        const ingredients: Ingredient = this.props.draftOrder.ingredients;
        return (
            <React.Fragment>
                <Header/>
                <div className='checkout'>
                    <Prompt when={this.state.showPrompt} message="Doing this will clear all your ingredients of this burger... Still Want To Proceed?"/>
                    <h1 className="checkout__main-text">We hope it tastes well!</h1>
                    <div className='checkout__burger-container'>
                        <BurgerDisplayWindow ingredients={ingredients} />
                    </div>
                    <div className="checkout__button-row">
                        <Button className="danger" size='medium' onClick={this.onCancelClicked}>Cancel</Button>
                        <Button className="success" size='medium' onClick={this.onContinueClicked}>Continue</Button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStoreStateToProps = (store: {burger: BurgerStore, orders: OrdersStore}) => ({
    draftOrder: store.orders.draftOrder
});

const mapDispatchToProps = (dispatch: any) => ({
    modifyDraftBurgerOrder: (order: PartialOrder) => dispatch(actions.createDraftBurgerOrder(order))
});

export default connect(mapStoreStateToProps, mapDispatchToProps)(Checkout);

interface CheckoutProps extends RouteComponentProps{
    draftOrder: PartialOrder,
    modifyDraftBurgerOrder: (order: PartialOrder) => void;
}

interface CheckoutState {
    showPrompt: boolean;
}