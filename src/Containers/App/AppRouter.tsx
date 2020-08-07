import React, {Suspense} from "react";
import Burger from "../Burger/Burger";
import {Redirect, Route, Switch} from "react-router-dom";
import {RoutePaths} from "../../enum/route-paths.enum";
import {NotFound} from "../../Components/NotFound/NotFound";
import MyOrders from "../MyOrders/MyOrders";

const Checkout  = React.lazy(() => import("../Checkout/Checkout"));
const DeliveryData  = React.lazy(() => import("../DeliveryData/DeliveryData"));

export const AppRouter = () => {
    return (
        <React.Fragment>
            <Switch>
                <Route path={RoutePaths.BURGER_BUILDER} exact component={Burger} />
                <Route path={RoutePaths.CHECKOUT} exact render={props => {
                    return (
                        <Suspense fallback={null}>
                            <Checkout {...props}/>
                        </Suspense>
                    );
                }} />
                <Route path={RoutePaths.DELIVERY_DATA} render={props => {
                    return (
                        <Suspense fallback={null}>
                            <DeliveryData {...props}/>
                        </Suspense>
                    );
                }}/>
                <Route path={RoutePaths.MY_ORDERS} component={MyOrders} exact/>
                <Redirect to={RoutePaths.HOME} from={RoutePaths.ROOT} exact/>
                <Redirect to={RoutePaths.BURGER_BUILDER} from={RoutePaths.HOME} exact/>
                <Route component={NotFound} />
            </Switch>
        </React.Fragment>
    );
}