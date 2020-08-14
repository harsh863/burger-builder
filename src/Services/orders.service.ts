import {ApiService} from "./api.service";
import {Order} from "../Models/order.model";

export class OrdersService {
    private static instance: OrdersService;
    constructor(private _apiService: ApiService) {}

    static getInstance(): OrdersService {
        if (!OrdersService.instance) {
            OrdersService.instance = new OrdersService(ApiService.getInstance());
        }
        return OrdersService.instance;
    }

    getOrders(userId: string): Promise<Order[]> {
        const queryParams = '&orderBy="userId"&equalTo="' + userId + '"';
        return this._apiService.get('/orders.json', queryParams).then((val: {[key: string]: Order}) => {
            return Promise.resolve(Object.values(val));
        }).catch(error => Promise.reject(error));
    }

    orderBurger(data: Order): Promise<any> {
        return this._apiService.post(`/orders.json`, data);
    }
}