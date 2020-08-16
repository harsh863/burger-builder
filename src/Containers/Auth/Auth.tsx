import React, {PureComponent, Fragment} from "react";
import {connect} from "react-redux";
import {AuthStore} from "../../Models/auth-store.model";
import {Input} from "../../Helper/FormItems/Input/Input";
import * as actions from '../../Store/Actions/combined-action';
import {Button, Tooltip} from "@material-ui/core";
import './Auth.scss';
import {NotificationService} from "../../Services/notification.service";
import { PulseLoader} from "react-spinners";
import {RandomColorUtils} from "../../Utils/random-color.utils";
import {RouteComponentProps, withRouter} from "react-router";
import {RoutePaths} from "../../Enum/route-paths.enum";
import {anonymousGuard} from "../../HOC/Guards/anonymous.guard";
import {ArrowBackIos} from "@material-ui/icons";

class Auth extends PureComponent<AuthProps, AuthState> {
    state = {
        form: { email: '', password: '' },
        fieldValidity: { email: false, password: false },
        isLoginMode: true,
        isResetPasswordMode: false,
        isDesktopMode: true
    };
    private _notificationService = NotificationService.getInstance();

    componentDidMount() {
        this.setState({isDesktopMode: window.innerWidth > 650});
        window.addEventListener('resize', this.onResize);
    }

    onResize = () => {
        this.setState({isDesktopMode: window.innerWidth > 650});
    }

    UNSAFE_componentWillReceiveProps(nextProps: Readonly<AuthProps>, nextContext: any) {
        if (nextProps.loginFailed || nextProps.signupFailed || nextProps.resetPasswordFailed) {
            this._notificationService.showNotification(nextProps.errorMessage, "error");
        }
        if (nextProps.signupSuccessful) {
            this._notificationService.showNotification('Account Created Successfully', "success");
            this.setState({isLoginMode: true});
        }
        if (nextProps.loginSuccessful) {
            this._notificationService.showNotification('Signed In Successfully', "success");
            this.props.history.replace(RoutePaths.HOME);
        }
        if (nextProps.resetPasswordSuccessful) {
            this._notificationService.showNotification(`We have sent you a password reset link at "${this.state.form.email}"`, "success");
            this.setState({isResetPasswordMode: false, isLoginMode: true});
        }
    }

    shouldDisableFields = (): boolean => {
        return ((this.props.loginStarted && !(this.props.loginSuccessful || this.props.loginFailed)) ||
            (this.props.signupStarted && !(this.props.signupSuccessful || this.props.signupFailed))) ||
            ((this.props.resetPasswordStarted && !(this.props.resetPasswordSuccessful || this.props.resetPasswordFailed)));
    }

    updateForm = (key: string, value: string) => {
        this.setState(state => ({form: {...state.form, [key]: value}}));
    }

    updateFormValidity = (field: string, fieldInvalid: boolean) => {
        this.setState(state => ({...state, fieldValidity: {...state.fieldValidity, [field]: !fieldInvalid}}));
    }

    submit = () => {
        this.state.isResetPasswordMode ?
            this.props.resetPassword(this.state.form.email) :
            this.state.isLoginMode ?
                this.props.signIn(this.state.form.email, this.state.form.password):
                this.props.signUp(this.state.form.email, this.state.form.password);
    }

    changeLoginMode = () => {
        if (this.shouldDisableFields()) {
            return;
        }
        this.setState(state => ({isLoginMode: !state.isLoginMode, isResetPasswordMode: false, form: { email: '', password: '' }, fieldValidity: {email: false, password: false}}));
    }

    toggleResetPasswordMode = (event: any) => {
        if (this.shouldDisableFields()) {
            return;
        }
        this.setState(state => ({isResetPasswordMode: !state.isResetPasswordMode, fieldValidity: {password: !state.isResetPasswordMode, email: false}, form: { email: '', password: '' }}));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    getTooltipText = (): string => {
        return !this.state.isResetPasswordMode ? 'Reset Password' : `Go Back to ${this.state.isLoginMode ? 'Login' : 'Sign up'}`;
    }

    render() {
        return (
            <div className="auth-container">
                {
                    !this.state.isDesktopMode ?
                        <div className="auth-container__title">Burger Builder</div> : null

                }
                <div className="auth-container__main-block">
                    {
                        this.state.isDesktopMode ?
                            <div className="auth-container__main-block__empty-div" /> : null
                    }
                    <div className="auth-container__main-block__login-block">
                        <div className="auth-container__main-block__login-block__form-block">
                            <div className="auth-container__main-block__login-block__form-block__title">{this.state.isResetPasswordMode ? 'Reset Password' : this.state.isLoginMode ? ' LOGIN' : 'SIGN UP'}</div>

                            <div className="auth-container__main-block__login-block__form-block__input-container">
                                <Input value={this.state.form.email}
                                       label="Email" placeholder="Email" type="email"
                                       required disabled={this.shouldDisableFields()}
                                       onChange={event => this.updateForm('email', event.target.value)}
                                       onValidityChange={event => this.updateFormValidity('email', event)} />
                            </div>

                            {
                                !this.state.isResetPasswordMode ?
                                    <div className="auth-container__main-block__login-block__form-block__input-container">
                                        <Input value={this.state.form.password}
                                               label="Password" placeholder="Password" type="password"
                                               minLength={6}
                                               required disabled={this.shouldDisableFields()}
                                               onChange={event => this.updateForm('password', event.target.value)}
                                               onValidityChange={event => this.updateFormValidity('password', event)} />
                                    </div> : null
                            }

                            <div className="auth-container__main-block__login-block__form-block__input-container">
                                <Button variant="contained" color="primary" style={{marginRight: '10px'}}
                                        disabled={!!Object.values(this.state.fieldValidity).filter(valid => !valid).length || this.shouldDisableFields()}
                                        onClick={this.submit}>{this.state.isResetPasswordMode ? 'SEND LINK' : this.state.isLoginMode ? 'LOGIN' : 'SIGN UP'}</Button >

                                {
                                    this.shouldDisableFields() ?
                                        <PulseLoader color={RandomColorUtils.getRandomColor()} size={6}/> : null
                                }
                            </div>
                        </div>
                        <div className="auth-container__main-block__login-block__footer">
                            <Tooltip title={this.getTooltipText()}>
                                <div className={"auth-container__main-block__login-block__footer__forgot-password" + (this.shouldDisableFields() ? " disable" : "")} onClick={this.toggleResetPasswordMode}>
                                    {!this.state.isResetPasswordMode ? 'Forgot Password ?' : <ArrowBackIos color="primary"/> }
                                </div>
                            </Tooltip>
                            <Fragment>
                                {
                                    this.state.isLoginMode ?
                                        <div className="auth-container__main-block__login-block__footer__navigate-link"><p>Don't have an account? </p><strong className={this.shouldDisableFields() ? "disable" : ""} onClick={_ => this.changeLoginMode()}>Sign Up</strong></div> :
                                        <div className="auth-container__main-block__login-block__footer__navigate-link"><p>Already have an account? </p><strong className={this.shouldDisableFields() ? "disable" : ""} onClick={_ => this.changeLoginMode()}>Login</strong></div>
                                }
                            </Fragment>
                        </div>
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
    resetPasswordStarted: store.auth.reset_password_initiated,
    resetPasswordSuccessful: store.auth.reset_password_successful,
    resetPasswordFailed: store.auth.reset_password_failed,
    errorMessage: store.auth.errorMessage
});

const mapDispatchToProps = (dispatch: any) => ({
    signIn: (email: string, password: string) => dispatch(actions.signIn(email, password)),
    signUp: (email: string, password: string) => dispatch(actions.signUp(email, password)),
    resetPassword: (email: string) => dispatch(actions.resetPassword(email))
});

export default connect(mapStoreStateToProps, mapDispatchToProps)(anonymousGuard(withRouter(Auth)));

interface AuthProps extends RouteComponentProps{
    loginStarted: boolean;
    loginSuccessful: boolean;
    loginFailed: boolean;
    signupStarted: boolean;
    signupSuccessful: boolean;
    signupFailed: boolean;
    resetPasswordStarted: boolean;
    resetPasswordSuccessful: boolean;
    resetPasswordFailed: boolean;
    errorMessage: string;
    signIn: (email: string, password: string) => void;
    signUp: (email: string, password: string) => void;
    resetPassword: (email: string) => void;
}

interface AuthState {
    form: { email: string, password: string };
    fieldValidity: { email: boolean, password: boolean };
    isLoginMode: boolean;
    isResetPasswordMode: boolean;
    isDesktopMode: boolean;
}