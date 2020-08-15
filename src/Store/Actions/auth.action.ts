import {StoreAction} from "../../Models/store-action.model";
import {StoreActions} from "../../Enum/store-actions.enum";
import {AuthService} from "../../Services/auth.service";

export const login = (data: any): StoreAction => ({
    type: StoreActions.LOGIN,
    payload: {...data}
});

export const startLogin = (): StoreAction => ({
    type: StoreActions.LOGIN_STARTED
});

export const completeLogin = (isError = false, message?: string): StoreAction => ({
    type: StoreActions.LOGIN_COMPLETED,
    payload: {error: isError, message}
});

export const startSignUp = (): StoreAction => ({
    type: StoreActions.SIGN_UP_STARTED
});

export const completeSignUp = (isError = false, message?: string): StoreAction => ({
    type: StoreActions.SIGN_UP_COMPLETED,
    payload: {error: isError, message}
});

export const startTokenExchange = (): StoreAction => ({
    type: StoreActions.ID_TOKEN_LOADING
});

export const setIdToken = (data: any): StoreAction => ({
    type: StoreActions.EXCHANGE_ID_TOKEN,
    payload: {...data}
});

export const tokenExchangeCompleted = (isError = false, message?: string): StoreAction => ({
    type: StoreActions.ID_TOKEN_EXCHANGE_COMPLETED,
    payload: {error: isError, message}
});

export const resetPasswordStarted = (): StoreAction => ({
   type: StoreActions.RESET_PASSWORD_STARTED
});

export const resetPasswordCompleted = (isError = false, message?: string): StoreAction => ({
    type: StoreActions.RESET_PASSWORD_COMPLETED,
    payload: {error: isError, message}
});

export const logout = (): StoreAction => ({
    type: StoreActions.LOGOUT
});

export const signIn = (email: string, password: string) => {
    return (dispatch: any) => {
        dispatch(startLogin());
        const authService = AuthService.getInstance();
        authService.signIn(email, password).then(res => {
            dispatch(login(res));
            dispatch(completeLogin());
        }).catch(error => dispatch(completeLogin(true, error.message)));
    }
}

export const signUp = (email: string, password: string) => {
    return (dispatch: any) => {
        dispatch(startSignUp());
        const authService = AuthService.getInstance();
        authService.signUp(email, password)
            .then(_ => dispatch(completeSignUp()))
            .catch(error => dispatch(completeSignUp(true, error.message)));
    }
}

export const generateIDToken = (refreshToken: string) => {
    return (dispatch: any, getState: any) => {
        if (!getState().auth.id_token_loading) {
            dispatch(startTokenExchange());
            const authService = AuthService.getInstance();
            authService.exchangeIdToken(refreshToken)
                .then(res => {
                    dispatch(setIdToken(res));
                    dispatch(tokenExchangeCompleted());
                }).catch(error => dispatch(tokenExchangeCompleted(true, error.message)));
        } else {
            dispatch(() => {});
        }
    }
}

export const resetPassword = (email: string) => {
    return (dispatch: any) => {
        dispatch(resetPasswordStarted());
        const authService = AuthService.getInstance();
        authService.resetPassword(email)
            .then(_ => dispatch(resetPasswordCompleted()))
            .catch(error => dispatch(resetPasswordCompleted(true, error.message)));

    };
}