import React, {Component} from "react";
import {FormControl, InputLabel, ListItem, Select} from "@material-ui/core";

export class FormSelect extends Component<FormSelectProps, any> {

    render() {
        return (
            <FormControl variant={this.props.variant || 'outlined'} style={{width: '100%'}}
                         size={this.props.size || 'small'}
                         disabled={this.props.disabled}>
                {
                    this.props.label ?
                        <InputLabel>{this.props.label}</InputLabel> : null
                }
                <Select value={this.props.value || this.props.options[0].value}
                        onChange={this.props.onSelect}
                        IconComponent={this.props.iconComponent}
                        label={this.props.label || ''}>
                    {this.props.options.map(option =>
                        <ListItem key={option.value} value={option.value} style={{cursor: 'pointer'}}>
                            {
                                option?.meta?.iconUrl ?
                                    <img src={option.meta.iconUrl} alt="" style={{marginRight: '10px'}}/> : null
                            }
                            {option.displayName}
                        </ListItem>
                    )}
                </Select>
            </FormControl>
        );
    }
}
interface FormSelectProps {
    variant?: 'standard' | 'outlined' | 'filled';
    size?: 'small' | 'medium';
    label?: string;
    value?: any;
    disabled?: boolean;
    options: {value: any, displayName: any, meta?: any}[];
    onSelect: (event: any) => void,
    iconComponent?: React.ElementType;
}