import axios from 'axios';

export class ApiService {
    private static instance: ApiService;
    axiosInstance = axios.create({
        baseURL: '',
        responseType: "json",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    static getInstance(): ApiService {  // can be used in function based components
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    get = async (path: string, authHeader = false) => {
        try {
            return await this.axiosInstance.get(path).then(res => res.data);
        } catch (error) {
            return error;
        }
    }

    post = async (path: string, body: any, authHeader = false) => {
        try {
            return await this.axiosInstance.post(path, body).then(res => res.data);
        } catch (error) {
            return error;
        }
    }

    delete = async (path: string, authHeader = false) => {
        try {
            return await this.axiosInstance.delete(path).then(res => res.data);
        } catch (error) {
            return error;
        }
    }
}