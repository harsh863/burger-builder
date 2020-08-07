import React, {Component, Suspense} from "react";
import {BurgerDisplayWindow} from "../../Components/BurgerDisplayWindow/BurgerDisplayWindow";
import {IngredientControllerContext} from "../../Context/IngredientControllerContext";
import {IngredientsController} from "../../Components/IngredientsController/IngredientsController";
import {Ingredient} from "../../models/ingredient.model";
import {RouteComponentProps} from "react-router";
import {RoutePaths} from "../../enum/route-paths.enum";
import {Header} from "../Header/Header";
import {connect} from "react-redux";
import {BurgerStore} from "../../models/burger-store.model";
import {OrdersStore} from "../../models/orders-store.model";
import * as actions from '../../Store/Actions/combined-action';
import './Burger.scss';
import {PartialOrder} from "../../models/order.model";

const OrderCard = React.lazy(() => import('../../Components/OrderCard/OrderCard'));

class Burger extends Component<BurgerContainerProps, BurgerContainerState> {
    state = {
        isOrderCardVisible: false,
        requests: { continueOrder: false },
        showBurgerOverview: true
    }

    componentDidMount() {
        this.props.clearDraftOrder();
        this.props.initialiseBurger();
        window.addEventListener('resize', this.onResize);
        this.setState({showBurgerOverview: window.innerWidth  >= 900});
    }

    onOrderClicked = () => {
        this.setState({isOrderCardVisible: true});
    }

    onOrderCardClose = (event: any) => {
        event.stopPropagation();
        this.setState({isOrderCardVisible: false, requests: {continueOrder: false}});
    }

    saveOrder = (event: any) => {
        event.stopPropagation();
        this.setState({requests: {continueOrder: true}});
        setTimeout(_ => {
            this.setState({requests: {continueOrder: false}});
            this.props.draftBurgerOrder({ingredients: this.props.ingredients, price: this.props.price});
            this.props.history.push(RoutePaths.CHECKOUT);
        }, 500);
    }

    onResize = () => {
        this.setState({showBurgerOverview: window.innerWidth  >= 900});
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    render() {
        return (
            <React.Fragment>
                <Header/>
                {
                    this.state.showBurgerOverview ?
                        <div className='overview-window'><BurgerDisplayWindow ingredients={this.props.ingredients} smallView/></div> :
                        null
                }
                <div className='burger-container'><BurgerDisplayWindow ingredients={this.props.ingredients} /></div>
                <IngredientControllerContext.Provider value={{addIngredient: this.props.addIngredient, removeIngredient: this.props.removeIngredient}}>
                    <IngredientsController ingredients={this.props.ingredients} price={this.props.price} order={this.onOrderClicked} />
                </IngredientControllerContext.Provider>
                {
                    this.state.isOrderCardVisible ?
                        <Suspense fallback={<div/>}>
                            <OrderCard ingredients={this.props.ingredients}
                                       requestInProgress={this.state.requests.continueOrder}
                                       price={this.props.price}
                                       show={this.state.isOrderCardVisible}
                                       onClose={this.onOrderCardClose}
                                       onOrder={this.saveOrder} />
                        </Suspense> :
                        null
                }
            </React.Fragment>
        )
    }
}

const mapStoreStateToProps = (store: {burger: BurgerStore, orders: OrdersStore}) => ({
    ingredients: store.burger.ingredients,
    price: store.burger.price
});

const mapDispatchToProps = (dispatch: any) => ({
    addIngredient: (ingredientName: string) => dispatch(actions.addIngredient(ingredientName)),
    removeIngredient: (ingredientName: string) => dispatch(actions.removeIngredient(ingredientName)),
    draftBurgerOrder: (order: PartialOrder) => dispatch(actions.createDraftBurgerOrder(order)),
    initialiseBurger: () => dispatch(actions.initialiseBurger()),
    clearDraftOrder: () => dispatch(actions.clearDraftBurgerOrder())
});

export default connect(mapStoreStateToProps, mapDispatchToProps)(Burger);

interface BurgerContainerProps extends RouteComponentProps{
    ingredients: Ingredient;
    price: number;
    addIngredient: (name: string) => void;
    removeIngredient: (name: string) => void;
    draftBurgerOrder: (order: PartialOrder) => void;
    initialiseBurger: () => void;
    clearDraftOrder: () => void;
}

interface BurgerContainerState {
    isOrderCardVisible: boolean;
    requests: { continueOrder: boolean };
    showBurgerOverview: boolean;
}