import axios from 'axios';
import {BASE_URL} from "../Constant/constant";
import {store} from "../index";

export class ApiService {
    private static instance: ApiService;

    axiosInstance = axios.create({
        baseURL: BASE_URL,
        responseType: "json",
        headers: { 'Content-Type': 'application/json' }
    });

    static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    get = async (path: string, params?: string) => {
        return await this.axiosInstance.get(path + this.getQueryParams(params))
            .then(res => res.data)
            .catch(error => Promise.reject(error.response));
    }

    post = async (path: string, body: any) => {
        return await this.axiosInstance.post(path + this.getQueryParams(), body)
            .then(res => res.data)
            .catch(error => Promise.reject(error.response));
    }

    delete = async (path: string) => {
        return await this.axiosInstance.delete(path + this.getQueryParams())
            .then(res => res.data)
            .catch(error => Promise.reject(error.response));
    }

    private getQueryParams = (additionalParams?: string): string => {
        return `?auth=${store.getState().auth.idToken}` + (additionalParams || '');
    };
}
