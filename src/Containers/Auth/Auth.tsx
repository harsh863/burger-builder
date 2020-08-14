import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {AuthStore} from "../../Models/auth-store.model";
import {Input} from "../../Helper/FormItems/Input/Input";
import * as actions from '../../Store/Actions/combined-action';
import {Button} from "@material-ui/core";
import './Auth.scss';
import {NotificationService} from "../../Services/notification.service";
import { PulseLoader} from "react-spinners";
import {RandomColorUtils} from "../../Utils/random-color.utils";
import {RouteComponentProps, withRouter} from "react-router";
import {RoutePaths} from "../../Enum/route-paths.enum";
import {anonymousGuard} from "../../HOC/Guards/anonymous.guard";

class Auth extends PureComponent<AuthProps, AuthState> {
    state = {
        form: { email: '', password: '' },
        fieldValidity: { email: false, password: false },
        isLoginMode: true
    };
    private _notificationService = NotificationService.getInstance();

    UNSAFE_componentWillReceiveProps(nextProps: Readonly<AuthProps>, nextContext: any) {
        if (nextProps.loginFailed || nextProps.signupFailed) {
            this._notificationService.showNotification(nextProps.errorMessage, "error");
        }
        if (nextProps.signupSuccessful) {
            this._notificationService.showNotification('Account Created Successfully', "success");
            this.setState({isLoginMode: true});
        }
        if (nextProps.loginSuccessful) {
            this._notificationService.showNotification('Signed In Successfully', "success");
            this.props.history.push(RoutePaths.HOME);
        }
    }

    isFormFieldsValid = (): boolean => {
        return ((this.props.loginStarted && !(this.props.loginSuccessful || this.props.loginFailed)) || (this.props.signupStarted && !(this.props.signupSuccessful || this.props.signupFailed)));
    }

    updateForm = (key: string, value: string) => {
        this.setState(state => ({form: {...state.form, [key]: value}}));
    }

    updateFormValidity = (field: string, fieldInvalid: boolean) => {
        this.setState(state => ({...state, fieldValidity: {...state.fieldValidity, [field]: !fieldInvalid}}));
    }

    submit = () => {
        this.state.isLoginMode ?
            this.props.signIn(this.state.form.email, this.state.form.password):
            this.props.signUp(this.state.form.email, this.state.form.password);
    }

    changeLoginMode = () => {
        this.setState(state => ({isLoginMode: !state.isLoginMode, form: { email: '', password: '' }}));
    }

    render() {
        return (
            <div className="auth-container">
                <div className="auth-container__title">Burger Builder</div>
                <div className="auth-container__main-block">
                    <div className="auth-container__main-block__empty-div" />
                    <div className="auth-container__main-block__form-block">
                        <div className="auth-container__main-block__form-block__title">{this.state.isLoginMode ? 'SIGN IN' : 'SIGN UP'}</div>

                        <div className="auth-container__main-block__form-block__input-container">
                            <Input value={this.state.form.email}
                                   label="Email" placeholder="Email" type="email"
                                   required disabled={this.isFormFieldsValid()}
                                   onChange={event => this.updateForm('email', event.target.value)}
                                   onValidityChange={event => this.updateFormValidity('email', event)} />
                        </div>

                        <div className="auth-container__main-block__form-block__input-container">
                            <Input value={this.state.form.password}
                                   label="Password" placeholder="Password" type="password"
                                   required disabled={this.isFormFieldsValid()}
                                   onChange={event => this.updateForm('password', event.target.value)}
                                   onValidityChange={event => this.updateFormValidity('password', event)} />
                        </div>

                        <div className="auth-container__main-block__form-block__input-container">
                            <Button variant="contained" color="primary" style={{marginRight: '10px'}}
                                    disabled={!!Object.values(this.state.fieldValidity).filter(valid => !valid).length || this.isFormFieldsValid()}
                                    onClick={this.submit}>{this.state.isLoginMode ? 'SIGN IN' : 'SIGN UP'}</Button >

                            {
                                this.isFormFieldsValid() ?
                                    <PulseLoader color={RandomColorUtils.getRandomColor()} size={6}/> : null
                            }
                        </div>
                        {
                            !this.isFormFieldsValid() ?
                                <React.Fragment>
                                    {
                                        this.state.isLoginMode ?
                                            <p className="auth-container__main-block__form-block__navigate-link">Don't have an account? <strong onClick={event => this.changeLoginMode()}>Sign Up</strong></p> :
                                            <p className="auth-container__main-block__form-block__navigate-link">Already have an account? <strong onClick={event => this.changeLoginMode()}>Sign In</strong></p>
                                    }
                                </React.Fragment> : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStoreStateToProps = (store: {auth: AuthStore}) => ({
    loginStarted: store.auth.login_initiated,
    loginSuccessful: store.auth.login_successful,
    loginFailed: store.auth.login_failed,
    signupStarted: store.auth.signup_initiated,
    signupSuccessful: store.auth.signup_successful,
    signupFailed: store.auth.signup_failed,
    errorMessage: store.auth.errorMessage
});

const mapDispatchToProps = (dispatch: any) => ({
    signIn: (email: string, password: string) => dispatch(actions.signIn(email, password)),
    signUp: (email: string, password: string) => dispatch(actions.signUp(email, password))
});

export default connect(mapStoreStateToProps, mapDispatchToProps)(anonymousGuard(withRouter(Auth)));

interface AuthProps extends RouteComponentProps{
    loginStarted: boolean;
    loginSuccessful: boolean;
    loginFailed: boolean;
    signupStarted: boolean;
    signupSuccessful: boolean;
    signupFailed: boolean;
    errorMessage: string;
    signIn: (email: string, password: string) => void;
    signUp: (email: string, password: string) => void;
}

interface AuthState {
    form: { email: string, password: string };
    fieldValidity: { email: boolean, password: boolean };
    isLoginMode: boolean;
}