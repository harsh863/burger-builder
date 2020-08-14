import React, {Component} from "react";
import './DeliveryData.scss';
import {Input} from "../../Helper/FormItems/Input/Input";
import {FormSelect} from "../../Helper/FormItems/FormSelect/FormSelect";
import {DeliveryDetail} from "../../Models/delivery-detail.model";
import {Button, LinearProgress} from "@material-ui/core";
import {Prompt, RouteComponentProps} from "react-router";
import {RoutePaths} from "../../Enum/route-paths.enum";
import {NotificationService} from "../../Services/notification.service";
import {Order, PartialOrder} from "../../Models/order.model";
import {Header} from "../Header/Header";
import {BurgerStore} from "../../Models/burger-store.model";
import {OrdersStore} from "../../Models/orders-store.model";
import {connect} from "react-redux";
import * as actions from '../../Store/Actions/combined-action';
import {AuthStore} from "../../Models/auth-store.model";

class DeliveryData extends Component<DeliveryDataProps, DeliveryDataState> {
    options = [
        {value: 'normal', displayName: 'Normal'},
        {value: 'fastest', displayName: 'Fastest ( ₹ 20 extra )'}
    ];
    state = {
        form: {
            name: '',
            email: '',
            contact_number: '',
            address: {
                street: '',
                zip: '',
                country: ''
            },
            delivery_method: this.options[0].value
        },
        fieldValidityState: {
            name: false,
            street: false,
            zip: false,
            country: false,
            email: false,
            contact_number: false,
            delivery_method: true
        },
        isFormValid: false,
    };
    private _notificationService = NotificationService.getInstance();

    componentDidMount() {
        const ingredientCount = Object.values(this.props.draftOrder.ingredients).reduce((a, b) => a + b, 0);
        if (ingredientCount < 1) {
            this.setState({fieldValidityState: {deliveryMethod: false}});
            setTimeout(() => this.props.history.push({ pathname: RoutePaths.NOT_FOUND, state: {message: 'Invalid Path'} }));
        }
    }

    componentDidUpdate(prevProps: Readonly<DeliveryDataProps>, prevState: Readonly<DeliveryDataState>, snapshot?: any) {
        if (this.props.orderSuccessful) {
            this._notificationService.showNotification('Burger Ordered Successfully', 'success');
            this.props.history.push(RoutePaths.BURGER_BUILDER);
        }
        if (this.props.orderFailed) {
            this._notificationService.showNotification('Ordering Burger Failed!!', 'error');
        }
    }

    updateForm = (key: string, value: string) => {
        if (!key.includes('.')) {
            this.setState(state => ({form: {...state.form, [key]: value}}));
        } else {
            const keys = key.split('.');
            // @ts-ignore
            this.setState(state => ({form: {...state.form, [keys[0]]: {...state.form[keys[0]], [keys[1]]: value}}}));
        }
    }

    updateFormValidity = (field: string, fieldInvalid: boolean) => {
        this.setState(state => ({...state, fieldValidityState: {...state.fieldValidityState, [field]: !fieldInvalid}}));
        this.setState(state => ({isFormValid: !Object.values(state.fieldValidityState).filter(valid => !valid).length}));
    }

    submit = () => {
        this.props.orderBurger({...this.props.draftOrder, price: this.props.draftOrder.price + (this.state.form.delivery_method === this.options[1].value ? 20 : 0), contact: this.state.form, userId: this.props.userId});
    }

    isFormFieldsValid = (): boolean => {
        return (this.props.orderStarted && !(this.props.orderSuccessful || this.props.orderFailed));
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="delivery-form-container">
                    <Prompt when={!!Object.values(this.state.fieldValidityState).filter(valid => valid).length && !(this.props.orderSuccessful || this.props.orderFailed)}
                            message="Are you sure you want to leave without ordering this burger?"/>

                    <h2 className="delivery-form-container__header-text">Enter Your Delivery Data</h2>

                    <div className="delivery-form-container__input-container">
                        <Input value={this.state.form.name}
                               label="Name" placeholder="Name"
                               required disabled={this.isFormFieldsValid()}
                               onChange={event => this.updateForm('name', event.target.value)}
                               onValidityChange={event => this.updateFormValidity('name', event)} />
                    </div>

                    <div className="delivery-form-container__input-container">
                        <Input value={this.state.form.email}
                               label="Email" placeholder="Email" type="email"
                               required disabled={this.isFormFieldsValid()}
                               onChange={event => this.updateForm('email', event.target.value)}
                               onValidityChange={event => this.updateFormValidity('email', event)} />
                    </div>

                    <div className="delivery-form-container__input-container">
                        <Input value={this.state.form.contact_number}
                               label="Contact Number" placeholder="Contact Number"
                               type="tel"
                               required disabled={this.isFormFieldsValid()}
                               onChange={event => this.updateForm('contact_number', event.target.value)}
                               onValidityChange={event => this.updateFormValidity('contact_number', event)} />
                    </div>

                    <div className="delivery-form-container__input-container">
                        <Input value={this.state.form.address.street}
                               label="Street" placeholder="Street"
                               required disabled={this.isFormFieldsValid()}
                               onChange={event => this.updateForm('address.street', event.target.value)}
                               onValidityChange={event => this.updateFormValidity('street', event)} />
                    </div>

                    <div className="delivery-form-container__input-container">
                        <Input value={this.state.form.address.zip}
                               label="ZIP Code" placeholder="ZIP Code"
                               type="number"
                               required disabled={this.isFormFieldsValid()}
                               onChange={event => this.updateForm('address.zip', event.target.value)}
                               onValidityChange={event => this.updateFormValidity('zip', event)} />
                    </div>

                    <div className="delivery-form-container__input-container">
                        <Input value={this.state.form.address.country}
                               label="Country" placeholder="Country"
                               required disabled={this.isFormFieldsValid()}
                               onChange={event => this.updateForm('address.country', event.target.value)}
                               onValidityChange={event => this.updateFormValidity('country', event)} />
                    </div>

                    <div className="delivery-form-container__input-container">
                        <FormSelect value={this.state.form.delivery_method}
                                    label="Delivery Method" options={this.options}
                                    disabled={this.isFormFieldsValid()}
                                    onSelect={event => this.updateForm('delivery_method', event.target.value)} />
                    </div>

                    <div className="delivery-form-container__input-container">
                        <Button className="delivery-form-container__input-container__order-button"
                                variant="contained" color="primary" disabled={false}
                                onClick={this.submit}>Order</Button>
                    </div>

                    {
                        this.isFormFieldsValid() ?
                            <LinearProgress style={{width: '100%', marginTop: '10px', borderRadius: '10px'}} color='primary'/> : null
                    }
                </div>
            </React.Fragment>
        );
    }
}

const mapStoreStateToProps = (store: {burger: BurgerStore, orders: OrdersStore, auth: AuthStore}) => ({
    draftOrder: store.orders.draftOrder,
    orderStarted: store.orders.burgerOrderStarted,
    orderSuccessful: store.orders.burgerOrderSuccessful,
    orderFailed: store.orders.burgerOrderFailed,
    userId: store.auth.userId
});

const mapDispatchToProps = (dispatch: any) => ({
    orderBurger: (order: Order) =>  dispatch(actions.postBurger(order))
});

export default connect(mapStoreStateToProps, mapDispatchToProps)(DeliveryData);

interface DeliveryDataProps extends RouteComponentProps {
    draftOrder: PartialOrder;
    orderStarted: boolean;
    orderSuccessful: boolean;
    orderFailed: boolean;
    orderBurger: (order: Order) => void;
    userId: string;
}

interface DeliveryDataState {
    form: DeliveryDetail;
    fieldValidityState: {};
    isFormValid: boolean;
}