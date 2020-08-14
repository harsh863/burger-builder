import React, {Component} from "react";
import {Order} from "../../Models/order.model";
import {NotificationService} from "../../Services/notification.service";
import {OrderPalette} from "../../Components/OrderPalette/OrderPalette";
import './MyOrders.scss';
import {Header} from "../Header/Header";
import {SpinnerService} from "../../Services/spinner.service";
import {RandomColorUtils} from "../../Utils/random-color.utils";
import {connect} from "react-redux";
import {BurgerStore} from "../../Models/burger-store.model";
import {OrdersStore} from "../../Models/orders-store.model";
import * as actions from '../../Store/Actions/combined-action';
import {RouteComponentProps} from "react-router";
import {AuthStore} from "../../Models/auth-store.model";
import {RoutePaths} from "../../Enum/route-paths.enum";
import {authGuard} from "../../HOC/Guards/auth.guard";
import {Link} from "react-router-dom";

class MyOrders extends Component<MyOrdersContainerProps, any>{
    private _notificationService = NotificationService.getInstance();
    private _spinnerService = SpinnerService.getInstance();

    componentDidMount() {
        if (!this.props.idTokenLoaded) {
            this.props.history.replace(RoutePaths.HOME);
            return;
        }
        this.props.fetchOrders(this.props.history, this.props.userId);
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.error) {
            this._notificationService.showNotification('An unknown error occurred while fetching Orders from server', "error");
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                {
                    this.props.loading || this.props.error ?
                        <div className="spinner-div">
                            {this._spinnerService.getRandomSpinners()}
                            <p style={{color: RandomColorUtils.getRandomColor()}}> Please wait while we fetch orders from our servers.</p>
                        </div> :
                        <div className="my-order-container">
                            {
                                this.props.orders.length ?
                                    this.props.orders.map((order: Order, index: string | number | undefined) => <OrderPalette key={index} order={order}/>) :
                                    <div className="my-order-container__no-orders-block">
                                        <h4 style={{color: RandomColorUtils.getRandomColor()}}>You haven't ordered anything yet.</h4>
                                        <p>Start creating your first burger by clicking <Link to={RoutePaths.BURGER_BUILDER}>here</Link></p>
                                    </div>
                            }
                        </div>
                }
            </React.Fragment>
        );
    }
}

const mapStoreStateToProps = (store: {burger: BurgerStore, orders: OrdersStore, auth: AuthStore}) => ({
    orders: store.orders.orders,
    loading: store.orders.ordersLoading,
    error: store.orders.fetchingOrdersFailed,
    userId: store.auth.userId,
    idTokenLoaded: store.auth.id_token_loaded
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchOrders: (history: any, userId: string) => dispatch(actions.fetchOrders(history, userId))
});

export default connect(mapStoreStateToProps, mapDispatchToProps)(authGuard(MyOrders));

interface MyOrdersContainerProps extends RouteComponentProps{
    orders: Order[];
    loading: boolean;
    error: boolean;
    idTokenLoaded: boolean;
    userId: string;
    fetchOrders: (history: any, userId: string) => void;
}