import React from "react";
import {Burger} from "../Burger/Burger";
import {Redirect, Route, Switch} from "react-router-dom";
import {Checkout} from "../../Components/Checkout/Checkout";
import {Header} from "../Header/Header";

export const AppRouter = () => {
    return (
        <React.Fragment>
            <Route path="/" component={Header} />
            <Switch>
                <Route path="/home" component={Burger} />
                <Route path="/checkout" component={Checkout} />
                <Redirect to="/home" from="/" exact/>
            </Switch>
        </React.Fragment>
    );
}