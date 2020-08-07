import React, {Component} from "react";
import {FormItem} from "../../../models/form-item.model";
import {FormItemType} from "../../../enum/form-item-type.enum";
import {Input} from "../Input/Input";
import {FormSelect} from "../FormSelect/FormSelect";
import {keys} from "@material-ui/core/styles/createBreakpoints";

export class Form extends Component<FormProps> {
    onFormFieldValueChange = (key: string, event: any) => {
        event.stopPropagation();
        this.props.onFormItemValueChange(key, event.target.value)
    }

    render() {
        return (
            this.props.formItems.map((formItem, index) => {
                switch (formItem.type) {
                    case FormItemType.INPUT:
                        return (
                            <Input key={Math.random() + index}
                                   value={formItem.value} label={formItem.label}
                                   placeholder={formItem.placeholder} required={formItem.required}
                                   disabled={formItem.disabled} focused={formItem.focused}
                                   onChange={event => this.onFormFieldValueChange(formItem.key, event)}
                                   onBlur={_ => this.props.onFormFieldBlur(formItem.key)}
                                   onValidityChange={(event => console.log(event))} />
                        );
                    case FormItemType.SELECT:
                        return (
                            <FormSelect key={Math.random() + index} value={formItem.value}
                                        label={formItem.label} options={formItem.options || []}
                                        disabled={formItem.disabled}
                                        onSelect={event => this.onFormFieldValueChange(formItem.key, event)} />
                        );
                }
            })
        );
    }
}

interface FormProps {
    formItems: FormItem[],
    onFormItemValueChange: (key: string, value: any) => void;
    onFormFieldBlur: (key: string) => void;
    onSubmit?: () => void;
}

interface FormState {
    form: {};
}