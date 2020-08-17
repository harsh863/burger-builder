import {StoreActions} from "../../Enum/store-actions.enum";
import {Order, PartialOrder} from "../../Models/order.model";
import {StoreAction} from "../../Models/store-action.model";
import {OrdersService} from "../../Services/orders.service";
import {RoutePaths} from "../../Enum/route-paths.enum";

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

export const burgerOrderCompleted = (isError = false): StoreAction => ({
    type: StoreActions.BURGER_ORDER_COMPLETED,
    payload: {error: isError}
});

export const deleteBurgerStart = (): StoreAction => ({
    type: StoreActions.DELETE_BURGER_STARTED
});

export const deleteBurger = (orderId: string): StoreAction => ({
    type: StoreActions.DELETE_BURGER,
    payload: {id: orderId}
});

export const deleteBurgerCompleted = (isError = false): StoreAction => ({
    type: StoreActions.DELETE_BURGER_COMPLETED,
    payload: {error: isError}
});


export const clearOrdersStore = (): StoreAction => ({
    type: StoreActions.CLEAR_ORDER_STORE
});

export const fetchOrders = (history: any, userId: string) => {
    return (dispatch: any, getState: any) => {
        if (!getState().orders.ordersLoaded) {
            dispatch(ordersLoading())
            const ordersService = OrdersService.getInstance();
            ordersService.getOrders(userId).then(orders => {
                dispatch(saveOrders(orders));
                dispatch(ordersLoaded(false));
            }).catch(error => {
                if (error?.status === 401) {
                    history.replace(RoutePaths.LOGOUT);
                }
                return dispatch(ordersLoaded(true));
            });
        } else {
            dispatch(() => {});
        }
    }
}

export const postBurger = (order: Order) => {
    return (dispatch: any) => {
        dispatch(burgerOrderStart());
        const ordersService = OrdersService.getInstance();
        ordersService.orderBurger(order).then((data: Order) => {
            dispatch(orderBurger(data));
            dispatch(burgerOrderCompleted());
        }).catch(_ => dispatch(burgerOrderCompleted(true)));
    }
}

export const deleteBurgerOrder = (orderId: string) => {
    return (dispatch: any, getState: any) => {
        if (!(getState().orders.deleteBurgerStarted && !(getState().orders.deleteBurgerSuccessful || getState().orders.deleteBurgerFailed))) {
            dispatch(deleteBurgerStart());
            const ordersService = OrdersService.getInstance();
            ordersService.deleteOrder(orderId).then(_ => {
                dispatch(deleteBurger(orderId));
                dispatch(deleteBurgerCompleted());
            }).catch(_ => dispatch(deleteBurgerCompleted(true)));
        } else {
            dispatch(() => {});
        }
    }
}