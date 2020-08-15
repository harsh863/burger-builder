import {Order, PartialOrder} from "./order.model";

export interface OrdersStore {
    orders: Order[];
    draftOrder: PartialOrder;
    ordersLoading: boolean;
    ordersLoaded: boolean;
    fetchingOrdersFailed: boolean;
    burgerOrderStarted: boolean;
    burgerOrderSuccessful: boolean;
    burgerOrderFailed: boolean;
    deleteBurgerStarted: boolean;
    deleteBurgerSuccessful: boolean;
    deleteBurgerFailed: boolean;
}