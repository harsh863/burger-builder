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
        case StoreActions.RESET_PASSWORD_STARTED: return resetPasswordStarted(state);
        case StoreActions.RESET_PASSWORD_COMPLETED: return resetPasswordCompleted(state, action);
        case StoreActions.LOGOUT: return getAuthStoreInitialState();
        default: return state;
    }
}

const loginStarted = (state: AuthStore): AuthStore =>
    ({ ...state, ...getLoginInitialState(), ...getSignupInitialState(), ...getResetPasswordInitialState(), login_initiated: true });

const login = (state: AuthStore, action: StoreAction): AuthStore =>
    ({ ...state, idToken: action.payload.idToken, login_successful: true, login_failed: false, id_token_loaded: true, id_token_loading: false, id_token_failed: false });

const loginCompleted = (state: AuthStore, action: StoreAction): AuthStore =>
    ({ ...state, login_successful: !action.payload.error, login_failed: action.payload.error, errorMessage: action.payload.message || ''});

const signUpStarted = (state: AuthStore): AuthStore =>
    ({ ...state, ...getLoginInitialState() , ...getSignupInitialState(), ...getResetPasswordInitialState(), signup_initiated: true});

const signUpCompleted = (state: AuthStore, action: StoreAction): AuthStore =>
    ({ ...state, signup_successful: !action.payload.error, signup_failed: action.payload.error, errorMessage: action.payload.message || ''});

const idTokenExchangeStarted = (state: AuthStore): AuthStore =>
    ({ ...state, ...getIdTokenInitialState(), id_token_loading: true});

const saveIdToken = (state: AuthStore, action: StoreAction): AuthStore =>
    ({ ...state, idToken: action.payload.id_token, userId: action.payload.user_id, id_token_loading: false, id_token_loaded: true, id_token_failed: false});

const idTokenExchangeCompleted = (state: AuthStore, action: StoreAction): AuthStore =>
    ({ ...state, id_token_loading: false, id_token_loaded: !action.payload.error, id_token_failed: action.payload.error, errorMessage: action.payload.message || ''});

const resetPasswordStarted = (state: AuthStore): AuthStore =>
    ({...state, ...getLoginInitialState(), ...getSignupInitialState(), ...getResetPasswordInitialState(), reset_password_initiated: true});

const resetPasswordCompleted = (state: AuthStore, action: StoreAction): AuthStore =>
    ({ ...state, reset_password_initiated: false, reset_password_successful: !action.payload.error, reset_password_failed: action.payload.error, errorMessage: action.payload.message || ''});

const getAuthStoreInitialState = (): AuthStore => ({
    errorMessage: '',
    idToken: '',
    userId: '',
    ...getLoginInitialState(),
    ...getSignupInitialState(),
    ...getIdTokenInitialState(),
    ...getResetPasswordInitialState()
});


const getLoginInitialState = (): {login_initiated: boolean, login_successful: boolean, login_failed: boolean}  => ({
    login_initiated: false,
    login_successful: false,
    login_failed: false
});

const getSignupInitialState = (): {signup_initiated: boolean, signup_successful: boolean, signup_failed: boolean}  => ({
    signup_initiated: false,
    signup_successful: false,
    signup_failed: false
});

const getIdTokenInitialState = (): {id_token_loading: boolean, id_token_failed: boolean, id_token_loaded: boolean} => ({
    id_token_loading: false,
    id_token_failed: false,
    id_token_loaded: false
});

const getResetPasswordInitialState = (): {reset_password_initiated: boolean, reset_password_failed: boolean, reset_password_successful: boolean} => ({
    reset_password_initiated: false,
    reset_password_failed: false,
    reset_password_successful: false
});
