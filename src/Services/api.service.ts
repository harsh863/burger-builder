import axios from 'axios';

export class ApiService {
    private static instance: ApiService;
    public static signal = axios.CancelToken.source();

    axiosInstance = axios.create({
        baseURL: 'https://react-burger-d81b5.firebaseio.com/',
        responseType: "json",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    get = async (path: string, authHeader = false) => {
        try {
            return await this.axiosInstance.get(path).then(res => res.data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    post = async (path: string, body: any, authHeader = false) => {
        try {
            return await this.axiosInstance.post(path, body).then(res => res.data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    delete = async (path: string, authHeader = false) => {
        try {
            return await this.axiosInstance.delete(path).then(res => res.data);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}