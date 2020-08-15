import axios from "axios";
import {AUTH_TOKEN, WEB_API_KEY} from "../Constant/constant";

export class AuthService {
    private static instance: AuthService;
    auth_sub_url = 'https://identitytoolkit.googleapis.com/v1/accounts:';

    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    signUp = async (email: string, password: string) => {
        const data = { email, password, returnSecureToken:  true };
        return await axios.post(`${this.auth_sub_url}signUp?key=${WEB_API_KEY}`, data)
            .then(res => Promise.resolve(res.data))
            .catch(error =>  Promise.reject(this.getErrorMessage(error)));
    }

    signIn = async (email: string, password: string) => {
        const data = { email, password, returnSecureToken:  true };
        return await axios.post(`${this.auth_sub_url}signInWithPassword?key=${WEB_API_KEY}`, data)
            .then(res => {
                localStorage.setItem(AUTH_TOKEN, res.data.refreshToken);
                return Promise.resolve(res?.data);
            }).catch(error => Promise.reject(this.getErrorMessage(error)));
    }

    resetPassword = async (email: string) => {
        const data = {requestType: 'PASSWORD_RESET', email};
        return await axios.post(`${this.auth_sub_url}sendOobCode?key=${WEB_API_KEY}`, data)
            .then(res => Promise.resolve(res?.data))
            .catch(error => Promise.reject(this.getErrorMessage(error)));
    }

    exchangeIdToken = async (refreshToken: string) =>  {
        const data = {grant_type: 'refresh_token', refresh_token: refreshToken}
        return await axios.post(`https://securetoken.googleapis.com/v1/token?key=${WEB_API_KEY}`, data)
            .then(res => Promise.resolve(res?.data)).catch(error => Promise.reject(this.getErrorMessage(error)));
    }

    getErrorMessage = (error: any) => {
        switch (error.response?.data?.error?.message) {
            case 'EMAIL_EXISTS':
                return {message: 'This email already exists'};
            case 'EMAIL_NOT_FOUND':
                 return  {message: 'This email does not exist'};
            case 'INVALID_PASSWORD':
                return  {message: 'Incorrect password'};
            case 'WEAK_PASSWORD : Password should be at least 6 characters':
                 return  {message: 'Password should be at least 6 characters long'};
            case 'INVALID_REFRESH_TOKEN':
                return {message: 'Unauthenticated User'};
            case 'USER_NOT_FOUND':
                return {message: 'Unauthenticated User'};
        }
        if (JSON.parse(JSON.stringify(error)).message === "Network Error") {
            return {message: "Network Error"};
        }
        return {message: 'An unknown error occurred'};
    }
}