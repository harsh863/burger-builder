import React, {Component} from "react";
import {AuthStore} from "../../Models/auth-store.model";
import * as actions from "../../Store/Actions/combined-action";
import {connect} from "react-redux";
import {RandomColorUtils} from "../../Utils/random-color.utils";
import {RouteComponentProps} from "react-router";
import {SpinnerService} from "../../Services/spinner.service";
import {RoutePaths} from "../../Enum/route-paths.enum";
import {AUTH_TOKEN} from "../../Constant/constant";
import {NotificationService} from "../../Services/notification.service";

export function homeResolver(WrappedComponent: any) {
    class HomeResolver extends Component<HomeResolverProps> {
        private _spinnerService = SpinnerService.getInstance();
        private _notificationService = NotificationService.getInstance();

        style = {
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        };

        componentDidMount() {
            if (localStorage.getItem(AUTH_TOKEN)) {
                if (!this.props.idTokenLoaded || !this.props.userId) {
                    this.props.getIdToken(localStorage.getItem(AUTH_TOKEN) + '');
                }
            } else {
                this.props.history.replace(RoutePaths.LOGOUT);
            }
        }

        componentDidUpdate(prevProps: Readonly<HomeResolverProps>, prevState: Readonly<{}>, snapshot?: any) {
            if (this.props.errorMessage === 'Unauthenticated User') {
                this.props.history.replace(RoutePaths.LOGOUT);
            }
            if (this.props.idTokenFailed) {
                this._notificationService.showNotification(this.props.errorMessage, 'error');
            }
        }

        render() {
            return (
                ((this.props.idTokenLoading && !this.props.idTokenLoaded) || this.props.idTokenFailed) ?
                    <div style={this.style}>
                        {this._spinnerService.getRandomSpinners()}
                        <p style={{color: RandomColorUtils.getRandomColor(), marginTop: '60px', textAlign: 'center'}}>Please wait while we load data from our servers.</p>
                    </div> : <WrappedComponent {...this.props} />
            );
        }
    }

    const mapStoreStateToProps = (store: {auth: AuthStore}) => ({
        idTokenLoading: store.auth.id_token_loading,
        idTokenFailed: store.auth.id_token_failed,
        idTokenLoaded: store.auth.id_token_loaded,
        errorMessage: store.auth.errorMessage,
        userId: store.auth.userId
    });

    const mapDispatchToProps = (dispatch: any) => ({
        getIdToken: (refreshToken: string) => dispatch(actions.generateIDToken(refreshToken))
    });

    return connect(mapStoreStateToProps, mapDispatchToProps)(HomeResolver);

}

interface HomeResolverProps extends RouteComponentProps{
    idTokenLoading: boolean;
    idTokenLoaded: boolean;
    idTokenFailed: boolean;
    errorMessage: string;
    userId: string;
    getIdToken: (refreshToken: string) => void;
}