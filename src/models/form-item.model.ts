import {FormItemType} from "../enum/form-item-type.enum";

export interface FormItem {
    type: FormItemType;
    value: any;
    label: string;
    inputType?: 'number' | 'text' | 'email' | 'password' | 'tel';
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    options?: any[];
    key: string;
    focused?: boolean;
}