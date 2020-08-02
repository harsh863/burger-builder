import React, {Component, Suspense} from "react";
import {Ingredients} from "../../enum/ingredients.enum";
import {Prices} from "../../enum/prices.enum";
import {BurgerDisplayWindow} from "../../Components/BurgerDisplayWindow/BurgerDisplayWindow";
import {IngredientControllerContext} from "../../Context/IngredientControllerContext";
import {IngredientsController} from "../../Components/IngredientsController/IngredientsController";
import {Ingredient} from "../../models/ingredient.model";
import './Burger.scss';
import {RouteProps} from "react-router";

const OrderCard = React.lazy(() => import('../../Components/OrderCard/OrderCard'));

export class Burger extends Component<RouteProps, BurgerState> {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        price: 0,
        isOrderCardVisible: false,
        requests: {
            saveOrder: false
        },
        showBurgerOverview: true
    }

    updateBurgerPrice = () => {
        this.setState((state: { ingredients: {}; }) => {
            let price = 0;
            Object.keys(state.ingredients).forEach(key => {
                const ingredients = state.ingredients;
                // @ts-ignore
                const ingredientQuantity = ingredients[key];
                if (ingredientQuantity > 0) {
                    // @ts-ignore
                    const ing_key = Object.keys(Ingredients).find(i => Ingredients[i] === key);
                    // @ts-ignore
                    price += ingredientQuantity * Prices[ing_key];
                }
            });
            price += Prices.TOP_BREAD + Prices.BOTTOM_BREAD + Prices.EXTRA;
            return {price: price};
        });
    }

    onOrderClicked = () => {
        this.setState({isOrderCardVisible: true});
    }

    addIngredient = (name: string) => {
        this.setState(state => {
            // @ts-ignore
            const prevCount = state.ingredients[name];
            return {
                ingredients: {
                    ...state.ingredients,
                    [name]: prevCount + 1
                }
            }
        });
        this.updateBurgerPrice();
    }

    removeIngredient = (name: string) => {
        this.setState(state => {
            // @ts-ignore
            const prevCount = state.ingredients[name];
            return {
                ingredients: {
                    ...state.ingredients,
                    [name]: prevCount > 0 ? prevCount - 1 : 0
                }
            }
        });
        this.updateBurgerPrice();
    }

    onOrderCardClose = (event: any) => {
        event.stopPropagation();
        this.setState({isOrderCardVisible: false, requests: {saveOrder: false}});
    }

    saveOrder = (event: any) => {
        event.stopPropagation();
        this.setState({requests: {saveOrder: true}});
    }

    onResize = () => {
        this.setState({showBurgerOverview: window.innerWidth  >= 900});
    }

    componentDidMount() {
        this.setState({showBurgerOverview: window.innerWidth  >= 900});
        window.addEventListener('resize', this.onResize);
        this.updateBurgerPrice();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.showBurgerOverview ?
                        <div className='overview-window'><BurgerDisplayWindow ingredients={this.state.ingredients} smallView/></div> :
                        null
                }
                <div className='burger-container'><BurgerDisplayWindow ingredients={this.state.ingredients} /></div>
                <IngredientControllerContext.Provider value={{addIngredient: this.addIngredient, removeIngredient: this.removeIngredient}}>
                    <IngredientsController ingredients={this.state.ingredients} price={this.state.price} order={this.onOrderClicked} />
                </IngredientControllerContext.Provider>
                {
                    this.state.isOrderCardVisible ?
                        <Suspense fallback={<div/>}>
                            <OrderCard ingredients={this.state.ingredients}
                                       requestInProgress={this.state.requests.saveOrder}
                                       price={this.state.price}
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

interface BurgerState {
    ingredients: Ingredient;
    price: number;
    isOrderCardVisible: boolean;
    requests: {
        saveOrder: boolean;
    };
    showBurgerOverview: boolean;
}