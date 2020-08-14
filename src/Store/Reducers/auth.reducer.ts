import {AuthStore} from "../../Models/auth-store.model";
import {StoreActions} from "../../Enum/store-actions.enum";
import {StoreAction} from "../../Models/store-action.model";

export const authReducer = (state: AuthStore = getAuthStoreInitialState(), action: StoreAction): AuthStore => {
    switch (action.type) {
        case StoreActions.LOGIN_STARTED: return loginStarted(state);
        case StoreActions.LOGIN: return login(state, action);
        case StoreActions.LOGIN_COMPLETED: return loginCompleted(state, action);
        case StoreActions.ID_TOKEN_LOADING: return idTokenExchangeStarted(state);
        case StoreActions.EXCHANGE_ID_TOKEN: return saveIdToken(state, action);
        case StoreActions.ID_TOKEN_EXCHANGE_COMPLETED: return idTokenExchangeCompleted(state, action);
        case StoreActions.SIGN_UP_STARTED: return signUpStarted(state);
        case StoreActions.SIGN_UP_COMPLETED: return signUpCompleted(state, action);
        case StoreActions.LOGOUT: return getAuthStoreInitialState();
        default: return state;
    }
}

const loginStarted = (state: AuthStore): AuthStore =>
    ({ ...state, login_initiated: true, login_successful: false, login_failed: false, signup_successful: false, signup_failed: false, signup_initiated: false });

const login = (state: AuthStore, action: StoreAction): AuthStore =>
    ({ ...state, idToken: action.payload.idToken, login_successful: true, login_failed: false, id_token_loaded: true, id_token_loading: false, id_token_failed: false });

const loginCompleted = (state: AuthStore, action: StoreAction): AuthStore =>
    ({ ...state, login_successful: !action.payload.error, login_failed: action.payload.error, errorMessage: action.payload.message || ''});

const signUpStarted = (state: AuthStore): AuthStore =>
    ({ ...state, signup_initiated: true, signup_successful: false, signup_failed: false});

const signUpCompleted = (state: AuthStore, action: StoreAction): AuthStore =>
    ({ ...state, signup_successful: !action.payload.error, signup_failed: action.payload.error, errorMessage: action.payload.message || ''});

const idTokenExchangeStarted = (state: AuthStore): AuthStore =>
    ({ ...state, id_token_loading: true, id_token_loaded: false, id_token_failed: false});

const saveIdToken = (state: AuthStore, action: StoreAction): AuthStore =>
    ({ ...state, idToken: action.payload.id_token, userId: action.payload.user_id, id_token_loading: false, id_token_loaded: true, id_token_failed: false});

const idTokenExchangeCompleted = (state: AuthStore, action: StoreAction): AuthStore =>
    ({ ...state, id_token_loading: false, id_token_loaded: !action.payload.error, id_token_failed: action.payload.error, errorMessage: action.payload.message || ''});

const getAuthStoreInitialState = (): AuthStore => ({
    errorMessage: '',
    idToken: '',
    userId: '',
    login_initiated: false,
    login_successful: false,
    login_failed: false,
    signup_initiated: false,
    signup_successful: false,
    signup_failed: false,
    id_token_loading: false,
    id_token_loaded: false,
    id_token_failed: false
});
