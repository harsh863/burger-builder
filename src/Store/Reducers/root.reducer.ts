import {combineReducers} from "redux";
import {burgerReducer} from "./burger.reducer";
import {ordersReducer} from "./orders.reducer";
import {authReducer} from "./auth.reducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    burger: burgerReducer,
    orders: ordersReducer,
});

