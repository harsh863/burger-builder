import React, {Component} from "react";
import {Order} from "../../models/order.model";
import {NotificationService} from "../../Services/notification.service";
import {OrderPalette} from "../../Components/OrderPalette/OrderPalette";
import './MyOrders.scss';
import {Header} from "../Header/Header";
import {SpinnerService} from "../../Services/spinner.service";
import {RandomColorUtils} from "../../Utils/random-color.utils";
import {connect} from "react-redux";
import {BurgerStore} from "../../models/burger-store.model";
import {OrdersStore} from "../../models/orders-store.model";
import * as actions from '../../Store/Actions/combined-action';
import {RouteComponentProps} from "react-router";

class MyOrders extends Component<MyOrdersContainerProps, any>{
    private _notificationService = NotificationService.getInstance();
    private _spinnerService = SpinnerService.getInstance();

    componentDidMount() {
        this.props.fetchOrders();
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
                            {this.props.orders.map((order: Order, index: string | number | undefined) => <OrderPalette key={index} order={order}/>)}
                        </div>
                }
            </React.Fragment>
        );
    }
}

const mapStoreStateToProps = (store: {burger: BurgerStore, orders: OrdersStore}) => ({
    orders: store.orders.orders,
    loading: store.orders.ordersLoading,
    error: store.orders.fetchingOrdersFailed
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchOrders: () => dispatch(actions.fetchOrders())
});

// @ts-ignore
export default connect(mapStoreStateToProps, mapDispatchToProps)(MyOrders);

interface MyOrdersContainerProps extends RouteComponentProps{
    orders: Order[];
    loading: boolean;
    error: boolean;
    fetchOrders: () => void;

}