import React, {Component, Fragment} from "react";
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
import {FormSelect} from "../../Helper/FormItems/FormSelect/FormSelect";
import moment from "moment";

class MyOrders extends Component<MyOrdersContainerProps, MyOrdersContainerState>{
    filterOptions = [
        {value: 'all', displayName: 'View All', meta: {iconUrl: "https://img.icons8.com/ios/17/000000/show-all-views.png"}},
        {value: 'delivered', displayName: 'Delivered', meta: {iconUrl: "https://img.icons8.com/nolan/17/000000/double-tick.png"}},
        {value: 'not_delivered', displayName: 'To be delivered', meta: {iconUrl: "https://img.icons8.com/ios/17/000000/data-pending.png"}}
    ];
    state = {
        isOrderDelete: true,
        filterValue: this.filterOptions[0].value,
        filteredOrders: []
    };
    private _notificationService = NotificationService.getInstance();
    private _spinnerService = SpinnerService.getInstance();

    UNSAFE_componentWillReceiveProps(nextProps: Readonly<MyOrdersContainerProps>, nextContext: any) {
        if (nextProps.error) {
            this._notificationService.showNotification('An unknown error occurred while fetching Orders from server', "error");
        }
        if (nextProps.deleteBurgerFailed) {
            this._notificationService.showNotification(`${this.state.isOrderDelete ? 'Deleting' : 'Cancelling'} Order Failed`, "error");
        }
        if (nextProps.deleteBurgerSuccessful) {
            this._notificationService.showNotification(`Order ${this.state.isOrderDelete ? 'Deleted' : 'Cancelled'} Successfully`, "success");
        }
    }

    getFilteredOrders = (allOrders: Order[], filterValue: string): Order[] => {
        return allOrders.filter(order => {
            const currentTime = moment(new Date());
            const difference_from_delivery = moment(order.delivery_time).diff(currentTime, 'minutes');
            if (filterValue === 'all') {
                return true;
            } else if (filterValue === 'delivered') {
                return difference_from_delivery <= 1;
            } else {
                return  difference_from_delivery > 1;
            }

        })
    }

    componentDidMount() {
        if (!this.props.idTokenLoaded) {
            this.props.history.replace(RoutePaths.HOME);
            return;
        }
        this.props.fetchOrders(this.props.history, this.props.userId);
    }

    onFilterChange = (value: string) => {
        this.setState({filterValue: value});
        this.forceUpdate();
    }

    filterIcon = () => {
        return <img src="https://img.icons8.com/ultraviolet/18/000000/filter.png" style={{paddingRight: '6px'}} alt=""/>;
    }

    deleteOrder = (orderId: string, isDelete: boolean) => {
        this.setState({isOrderDelete: isDelete});
        this.props.deleteOrder(orderId);
    }

    render() {
        return (
            <Fragment>
                <Header />
                {
                    this.props.loading || this.props.error ?
                        <div className="spinner-div">
                            {this._spinnerService.getRandomSpinners()}
                            <p style={{color: RandomColorUtils.getRandomColor(), textAlign: 'center'}}> Please wait while we fetch orders from our servers.</p>
                        </div> :
                        <div className="my-order-container">
                            {
                                this.props.orders.length ?
                                    <Fragment>
                                        <div className="my-order-container__filter-row">
                                            <FormSelect value={this.state.filterValue}
                                                        options={this.filterOptions} variant="standard"
                                                        onSelect={event => this.onFilterChange(event.target.value)}
                                                        iconComponent={this.filterIcon}/>
                                        </div>
                                        {
                                            this.getFilteredOrders(this.props.orders, this.state.filterValue).length > 0 ?
                                                this.getFilteredOrders(this.props.orders, this.state.filterValue).map((order: Order, index: string | number | undefined) =>
                                                    <OrderPalette key={order.id} order={order} onDelete={this.deleteOrder}/>) :
                                                <div className="my-order-container__null-filter-search-block">
                                                    <h4 style={{color: RandomColorUtils.getRandomColor()}}>Nothing Here</h4>
                                                    <p>To reset the filter, click <span className="link" onClick={event => this.onFilterChange(this.filterOptions[0].value)}>here</span></p>
                                                </div>
                                        }
                                    </Fragment> :
                                    <div className="my-order-container__no-orders-block">
                                        <h4 style={{color: RandomColorUtils.getRandomColor()}}>You haven't ordered anything yet.</h4>
                                        <p>Start creating your first burger by clicking <Link to={RoutePaths.BURGER_BUILDER}>here</Link></p>
                                    </div>
                            }
                        </div>
                }
            </Fragment>
        );
    }
}

const mapStoreStateToProps = (store: {burger: BurgerStore, orders: OrdersStore, auth: AuthStore}) => ({
    orders: store.orders.orders,
    loading: store.orders.ordersLoading,
    error: store.orders.fetchingOrdersFailed,
    userId: store.auth.userId,
    deleteBurgerStarted: store.orders.deleteBurgerStarted,
    deleteBurgerSuccessful: store.orders.deleteBurgerSuccessful,
    deleteBurgerFailed: store.orders.deleteBurgerFailed,
    idTokenLoaded: store.auth.id_token_loaded
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchOrders: (history: any, userId: string) => dispatch(actions.fetchOrders(history, userId)),
    deleteOrder: (orderId: string) =>  dispatch(actions.deleteBurgerOrder(orderId))
});

export default connect(mapStoreStateToProps, mapDispatchToProps)(authGuard(MyOrders));

interface MyOrdersContainerProps extends RouteComponentProps{
    orders: Order[];
    loading: boolean;
    error: boolean;
    idTokenLoaded: boolean;
    deleteBurgerStarted: boolean
    deleteBurgerSuccessful: boolean
    deleteBurgerFailed: boolean
    userId: string;
    fetchOrders: (history: any, userId: string) => void;
    deleteOrder: (orderId: string) => void;
}

interface MyOrdersContainerState {
    isOrderDelete: boolean;
    filterValue: string;
    filteredOrders: Order[];
}