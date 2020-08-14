import {StoreActions} from "../Enum/store-actions.enum";

export interface StoreAction{
    type: StoreActions,
    payload?: any;
}