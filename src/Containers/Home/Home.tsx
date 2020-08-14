import React, {PureComponent} from "react";
import {homeResolver} from "../../HOC/Resolvers/home.resolver";
import {Redirect} from "react-router";
import {RoutePaths} from "../../Enum/route-paths.enum";

export class Home extends PureComponent {
    render = () => <Redirect to={RoutePaths.BURGER_BUILDER} />;
}

export default homeResolver(Home);