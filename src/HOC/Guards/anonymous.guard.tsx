import React, {Component} from "react";
import {Redirect} from "react-router";
import {RoutePaths} from "../../Enum/route-paths.enum";
import {AUTH_TOKEN} from "../../Constant/constant";

export function anonymousGuard(WrappedComponent: any) {
    return class AnonymousGuard extends Component {
        render() {
            return (
                !localStorage.getItem(AUTH_TOKEN) ?
                    <WrappedComponent {...this.props} /> : <Redirect to={RoutePaths.HOME} />
            );
        }
    }
}