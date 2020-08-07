import {DeliveryDetail} from "./delivery-detail.model";
import {Ingredient} from "./ingredient.model";

export interface Order {
    contact: DeliveryDetail;
    price: number;
    ingredients: Ingredient;
}

export interface PartialOrder {
    ingredients: Ingredient;
    price: number;
    contact?: DeliveryDetail;
}