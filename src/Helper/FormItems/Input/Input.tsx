import React, {Component} from "react";
import {IconButton, InputAdornment, TextField} from "@material-ui/core";
import {ErrorMessage} from "../../../Enum/error-message.enum";
import './Input.scss';
import {EMAIL_REGEX, TEL_REGEX} from "../../../Constant/constant";
import {Visibility, VisibilityOff} from "@material-ui/icons";

export class Input extends Component<InputProps, InputState> {

    state = {
        invalid: true,
        touched: false,
        message: '',
        showPassword: false
    }

    onChange = (event: any) => {
        this.setState({touched: true});
        const value = event.target.value;
        this.props?.onChange(event);
        this.requiredErrorHandler(value);
        this.mobileErrorHandler(value);
        this.emailErrorHandler(value);
    }

    onBlur = (event: any) => {
        this.setState({touched: true});
        const value = event.target.value;
        this.requiredErrorHandler(value);
        this.mobileErrorHandler(value);
        this.emailErrorHandler(value);
    }

    mobileErrorHandler = (value: string) => {
        if (!!value && this.props.type === "tel") {
            if (!new RegExp(TEL_REGEX).test(value)) {
                this.setState({invalid: true, message: ErrorMessage.TELEPHONE});
            } else {
                this.setState({invalid: false, message: ''});
            }
            this.props.onValidityChange(!new RegExp(TEL_REGEX).test(value));
        }
    }

    emailErrorHandler = (value: string) => {
        if (!!value && this.props.type === 'email') {
            if (!new RegExp(EMAIL_REGEX).test(value)) {
                this.setState({invalid: true, message: ErrorMessage.EMAIL});
            } else {
                this.setState({invalid: false, message: ''});
            }
            this.props.onValidityChange(!new RegExp(EMAIL_REGEX).test(value));
        }
    }

    requiredErrorHandler = (value: string | number) => {
        if (!value && this.props.required) {
            this.setState({invalid: true, message: ErrorMessage.REQUIRED});
            this.props.onValidityChange(true);
        }
        if (this.props.required && !!value) {
            this.setState({invalid: false, message: ''});
            this.props.onValidityChange(false);
        }
    }

    handleClickShowPassword = () => {
        this.setState(state => ({showPassword: !state.showPassword}));
    };

    handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    render() {
        return (
            // @ts-ignore
            <TextField
                className="input-field"
                autoFocus={this.props.focused}
                disabled={this.props.disabled}
                onBlurCapture={this.props.onBlur}
                required={this.props.required}
                value={this.props.value}
                label={this.props.label || ''}
                placeholder={this.props.placeholder || ''}
                type={this.state.showPassword ? 'text' : this.props.type}
                variant={this.props.variant || 'outlined'}
                error={this.state.invalid && this.state.touched}
                size={this.props.size || 'small'}
                helperText={this.state.message}
                onChange={this.onChange}
                onBlur={this.onBlur}
                InputProps={{
                    endAdornment: (
                        this.props.type === "password" ?
                            <InputAdornment position="end">
                                <IconButton onClick={this.handleClickShowPassword} onMouseDown={this.handleMouseDownPassword}>
                                    {this.state?.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment> : null
                    )
                }}
                FormHelperTextProps={{
                    className: 'helper-text'
                }}/>
        );
    }
}

interface InputProps {
    disabled?: boolean;
    required?: boolean;
    value?: any;
    label?: string;
    placeholder?: string;
    type?: 'number' | 'text' | 'email' | 'password' | 'tel';
    variant?: 'filled' | 'outlined' | 'standard';
    size?: 'small' | 'medium';
    onChange: (event: any) => void;
    onValidityChange: (invalid: boolean) => void;
    focused?: boolean;
    onBlur?: (event: any) => void;
}

interface InputState {
    invalid: boolean;
    touched: boolean;
    message: string;
    showPassword: boolean;
}