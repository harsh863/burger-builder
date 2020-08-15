export interface AuthStore {
    errorMessage: string;
    idToken: string;
    userId: string;
    login_initiated: boolean;
    login_successful: boolean;
    login_failed: boolean;
    signup_initiated: boolean;
    signup_successful: boolean;
    signup_failed: boolean;
    id_token_loading: boolean;
    id_token_loaded: boolean;
    id_token_failed: boolean;
    reset_password_initiated: boolean;
    reset_password_successful: boolean;
    reset_password_failed: boolean;
}