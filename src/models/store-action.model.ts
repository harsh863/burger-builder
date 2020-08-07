import {StoreActions} from "../enum/store-actions.enum";

export interface StoreAction{
    type: StoreActions,
    payload?: any;
}