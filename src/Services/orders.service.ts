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
            const orders: Order[] = Object.entries(val).map(item => ({...item[1], id: item[0]}));
            return Promise.resolve(orders);
        }).catch(error => Promise.reject(error));
    }

    orderBurger(data: Order): Promise<any> {
        return this._apiService.post(`/orders.json`, data)
            .then((val: {name: string}) => Promise.resolve(({...data, id: val.name})))
            .catch(error => Promise.reject(error));
    }

    deleteOrder(orderId: string): Promise<any> {
        return this._apiService.delete(`orders/${orderId}.json`)
            .then(_ => Promise.resolve({message: 'order deleted successfully'}))
            .catch(error => Promise.reject(error));
    }
}