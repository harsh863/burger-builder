import {DeliveryDetail} from "./delivery-detail.model";
import {Ingredient} from "./ingredient.model";

export interface Order {
    id?: string;
    contact: DeliveryDetail;
    price: number;
    ingredients: Ingredient;
    userId: string;
    delivery_time: Date;
    order_time: Date;
}

export interface PartialOrder {
    ingredients: Ingredient;
    price: number;
    contact?: DeliveryDetail;
}