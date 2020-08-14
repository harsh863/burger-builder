import React, {Component, Suspense} from "react";
import Burger from "../Burger/Burger";
import {Redirect, Route, Switch} from "react-router-dom";
import {RoutePaths} from "../../Enum/route-paths.enum";
import MyOrders from "../MyOrders/MyOrders";
import Logout from "../../Components/Logout/Logout";
import {AUTH_TOKEN} from "../../Constant/constant";
import Home from "../Home/Home";

const Checkout  = React.lazy(() => import("../Checkout/Checkout"));
const DeliveryData  = React.lazy(() => import("../DeliveryData/DeliveryData"));
const Auth  = React.lazy(() => import("../Auth/Auth"));
const NotFound  = React.lazy(() => import("../../Components/NotFound/NotFound"));

class AppRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path={RoutePaths.HOME} exact component={Home} />
                <Route path={RoutePaths.AUTH} exact render={_ => (<Suspense fallback={null}><Auth/></Suspense>)}/>
                <Redirect to={localStorage.getItem(AUTH_TOKEN) ? RoutePaths.HOME : RoutePaths.AUTH} exact from={RoutePaths.ROOT}/>
                <Route path={RoutePaths.MY_ORDERS} component={MyOrders} exact/>
                <Route path={RoutePaths.BURGER_BUILDER} exact component={Burger} />
                <Route path={RoutePaths.LOGOUT} exact component={Logout}/>
                <Route path={RoutePaths.CHECKOUT} exact render={props => (<Suspense fallback={null}><Checkout {...props}/></Suspense> )} />
                <Route path={RoutePaths.DELIVERY_DATA} render={props => (<Suspense fallback={null}><DeliveryData {...props}/></Suspense> )}/>
                <Route render={props => (<Suspense fallback={null}><NotFound {...props}/></Suspense>)} />
            </Switch>
        );
    }
}

export default AppRouter;