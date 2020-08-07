import {combineReducers} from "redux";
import {burgerReducer} from "./burger.reducer";
import {ordersReducer} from "./orders.reducer";

export const rootReducer = combineReducers({
    burger: burgerReducer,
    orders: ordersReducer
});

