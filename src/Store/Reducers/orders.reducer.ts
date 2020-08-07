import {StoreAction} from "../../models/store-action.model";
import {OrdersStore} from "../../models/orders-store.model";
import {StoreActions} from "../../enum/store-actions.enum";
import {PartialOrder} from "../../models/order.model";

export const ordersReducer = (state: OrdersStore = getOrdersStoreInitialState(), action: StoreAction): OrdersStore => {
    switch (action.type) {
        case StoreActions.ORDERS_LOADING: return fetchingOrdersStarted(state);
        case StoreActions.SAVE_ORDERS: return saveOrders(state, action);
        case StoreActions.ORDERS_LOADED: return fetchingOrdersFinished(state, action);
        case StoreActions.CREATE_DRAFT_ORDER: return createDraftBurgerOrder(state, action);
        case StoreActions.CLEAR_DRAFT_ORDER: return clearDraftBurgerOrder(state);
        case StoreActions.BURGER_ORDER_INITIATED: return burgerOrderStarted(state);
        case StoreActions.ORDER_BURGER: return orderBurger(state, action);
        case StoreActions.BURGER_ORDER_COMPLETED: return burgerOrderCompleted(state, action);
        default: return state;
    }
}

const clearDraftBurgerOrder = (state: OrdersStore): OrdersStore =>
    ({ ...state, draftOrder: getEmptyDraftBurger(), burgerOrderFailed: false, burgerOrderSuccessful: false, burgerOrderStarted: false});

const createDraftBurgerOrder = (state: OrdersStore, action: StoreAction): OrdersStore =>
    ({ ...state, draftOrder: {...action.payload}});

const fetchingOrdersStarted = (state: OrdersStore): OrdersStore =>
    ({ ...state, ordersLoaded: false, ordersLoading: true, fetchingOrdersFailed: false });

const fetchingOrdersFinished = (state: OrdersStore, action: StoreAction): OrdersStore =>
    ({ ...state, ordersLoaded: !action.payload.error, ordersLoading: false, fetchingOrdersFailed: action.payload.error });

const saveOrders = (state: OrdersStore, action: StoreAction): OrdersStore =>
    ({ ...state, orders: action.payload.orders, ordersLoading: false, ordersLoaded: true });

const burgerOrderStarted = (state: OrdersStore): OrdersStore =>
    ({ ...state, burgerOrderStarted: true, burgerOrderSuccessful: false, burgerOrderFailed: false});

const burgerOrderCompleted = (state: OrdersStore, action: StoreAction): OrdersStore =>
    ({ ...state, burgerOrderStarted: true, burgerOrderSuccessful: !action.payload.error, burgerOrderFailed: action.payload.error});

const orderBurger = (state: OrdersStore, action: StoreAction): OrdersStore =>
    ({ ...state, draftOrder: getEmptyDraftBurger(), orders: [...state.orders, action.payload]});

const getEmptyDraftBurger = (): PartialOrder =>
    ({ ingredients: {salad: 0, bacon: 0, cheese: 0, meat: 0}, price: 0});

const getOrdersStoreInitialState = (): OrdersStore => ({
    orders: [],
    draftOrder: getEmptyDraftBurger(),
    ordersLoaded: false,
    ordersLoading: false,
    fetchingOrdersFailed: false,
    burgerOrderStarted: false,
    burgerOrderSuccessful: false,
    burgerOrderFailed: false
});
