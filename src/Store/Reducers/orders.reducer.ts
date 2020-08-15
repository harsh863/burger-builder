import {StoreAction} from "../../Models/store-action.model";
import {OrdersStore} from "../../Models/orders-store.model";
import {StoreActions} from "../../Enum/store-actions.enum";
import {PartialOrder} from "../../Models/order.model";

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
        case StoreActions.DELETE_BURGER_STARTED: return deleteBurgerStarted(state);
        case StoreActions.DELETE_BURGER: return deleteBurger(state, action);
        case StoreActions.DELETE_BURGER_COMPLETED: return deleteBurgerCompleted(state, action);
        case StoreActions.CLEAR_ORDER_STORE: return getOrdersStoreInitialState();
        default: return state;
    }
}

const clearDraftBurgerOrder = (state: OrdersStore): OrdersStore =>
    ({ ...state, draftOrder: getEmptyDraftBurger(), ...getBurgerOrderInitialState()});

const createDraftBurgerOrder = (state: OrdersStore, action: StoreAction): OrdersStore =>
    ({ ...state, draftOrder: {...action.payload}});

const fetchingOrdersStarted = (state: OrdersStore): OrdersStore =>
    ({ ...state, ...getOrdersInitialState(), ordersLoading: true });

const fetchingOrdersFinished = (state: OrdersStore, action: StoreAction): OrdersStore =>
    ({ ...state, ordersLoaded: !action.payload.error, ordersLoading: false, fetchingOrdersFailed: action.payload.error });

const saveOrders = (state: OrdersStore, action: StoreAction): OrdersStore =>
    ({ ...state, orders: action.payload.orders, ordersLoading: false, ordersLoaded: true, draftOrder: getEmptyDraftBurger()});

const burgerOrderStarted = (state: OrdersStore): OrdersStore =>
    ({ ...state, ...getBurgerOrderInitialState() , burgerOrderStarted: true});

const orderBurger = (state: OrdersStore, action: StoreAction): OrdersStore =>
    ({ ...state, draftOrder: getEmptyDraftBurger(), orders: [...state.orders, action.payload]});

const burgerOrderCompleted = (state: OrdersStore, action: StoreAction): OrdersStore =>
    ({ ...state, burgerOrderStarted: true, burgerOrderSuccessful: !action.payload.error, burgerOrderFailed: action.payload.error});

const deleteBurgerStarted = (state: OrdersStore): OrdersStore =>
    ({ ...state, ...getDeleteBurgerInitialState(), deleteBurgerStarted: true});

const deleteBurger = (state: OrdersStore, action: StoreAction): OrdersStore =>
    ({ ...state, orders: [...state.orders.filter(order => order.id !== action.payload.id)]});

const deleteBurgerCompleted = (state: OrdersStore, action: StoreAction): OrdersStore =>
    ({ ...state, deleteBurgerStarted: true, deleteBurgerSuccessful: !action.payload.error, deleteBurgerFailed: action.payload.error});

const getEmptyDraftBurger = (): PartialOrder =>
    ({ ingredients: {salad: 0, bacon: 0, cheese: 0, meat: 0}, price: 0});

const getOrdersStoreInitialState = (): OrdersStore => ({
    orders: [],
    draftOrder: getEmptyDraftBurger(),
    ...getOrdersInitialState(),
    ...getBurgerOrderInitialState(),
    ...getDeleteBurgerInitialState()
});

const getBurgerOrderInitialState = (): {burgerOrderStarted: boolean, burgerOrderSuccessful: boolean, burgerOrderFailed: boolean} => ({
    burgerOrderStarted: false,
    burgerOrderSuccessful: false,
    burgerOrderFailed: false
});

const getOrdersInitialState = (): {ordersLoaded: boolean, ordersLoading: boolean, fetchingOrdersFailed: boolean} => ({
    ordersLoaded: false,
    ordersLoading: false,
    fetchingOrdersFailed: false
});

const getDeleteBurgerInitialState = (): {deleteBurgerStarted: boolean, deleteBurgerSuccessful: boolean, deleteBurgerFailed: boolean} => ({
    deleteBurgerStarted: false,
    deleteBurgerSuccessful: false,
    deleteBurgerFailed: false
});