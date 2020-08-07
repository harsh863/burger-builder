import {StoreActions} from "../../enum/store-actions.enum";
import {Order, PartialOrder} from "../../models/order.model";
import {StoreAction} from "../../models/store-action.model";
import {OrdersService} from "../../Services/orders.service";
import {store} from "../../index";

export const saveOrders = (orders: Order[]): StoreAction => ({
    type: StoreActions.SAVE_ORDERS,
    payload: {orders}
});

export const ordersLoading = (): StoreAction => ({
    type: StoreActions.ORDERS_LOADING
});

export const ordersLoaded = (isError: boolean): StoreAction => ({
    type: StoreActions.ORDERS_LOADED,
    payload: {error: isError}
});

export const createDraftBurgerOrder = (order: PartialOrder): StoreAction => ({
    type: StoreActions.CREATE_DRAFT_ORDER,
    payload: {...order}
});

export const clearDraftBurgerOrder = (): StoreAction => ({
    type: StoreActions.CLEAR_DRAFT_ORDER
});

export const orderBurger = (order: Order): StoreAction => ({
    type: StoreActions.ORDER_BURGER,
    payload: {...order}
});

export const burgerOrderStart = (): StoreAction => ({
    type: StoreActions.BURGER_ORDER_INITIATED
});

export const burgerOrderSuccessful = (): StoreAction => ({
    type: StoreActions.BURGER_ORDER_COMPLETED,
    payload: {error: false}
});

export const burgerOrderFailed = (): StoreAction => ({
    type: StoreActions.BURGER_ORDER_COMPLETED,
    payload: {error: true}
});

export const fetchOrders = () => {
    return (dispatch: any) => {
        if (!store.getState().orders.ordersLoaded) {
            dispatch(ordersLoading())
            const ordersService = OrdersService.getInstance();
            ordersService.getOrders().then(orders => {
                dispatch(ordersLoaded(false));
                dispatch(saveOrders(orders));
            }).catch(_ => dispatch(ordersLoaded(true)));
        } else {
            dispatch(() => {});
        }
    }
}

export const postBurger = (order: Order) => {
    return (dispatch: any) => {
        dispatch(burgerOrderStart())
        const ordersService = OrdersService.getInstance();
        ordersService.orderBurger(order).then(_ => {
            dispatch(orderBurger(order));
            dispatch(burgerOrderSuccessful())
        }).catch(_ => dispatch(burgerOrderFailed()));
    }
}
