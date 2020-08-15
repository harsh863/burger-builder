import React, {Component} from "react";
import {AuthStore} from "../../Models/auth-store.model";
import {connect} from "react-redux";
import {AUTH_TOKEN} from "../../Constant/constant";
import {Redirect} from "react-router";
import {RoutePaths} from "../../Enum/route-paths.enum";

export function authGuard(WrappedComponent: any) {
    class AuthGuard extends Component<AuthGuardProps, any> {
        render() {
            return (
                this.props.idTokenLoaded && this.props.userId ?
                    <WrappedComponent {...this.props} /> : <Redirect to={RoutePaths.HOME} />
            );
        }
    }

    const mapStoreStateToProps = (store: {auth: AuthStore}) => ({
        idTokenLoaded: store.auth.id_token_loaded,
        userId: store.auth.userId,
        authToken: localStorage.getItem(AUTH_TOKEN) + ''
    });

    return connect(mapStoreStateToProps)(AuthGuard);
}

interface AuthGuardProps {
    idTokenLoaded: boolean;
    userId: string;
    authToken: string;
}