import React, {Component} from "react";
import './NotFound.scss';
import {RouteComponentProps} from "react-router";
import {RoutePaths} from "../../Enum/route-paths.enum";

export default class NotFound extends Component<RouteComponentProps> {

    goToHome = () => this.props.history.push(RoutePaths.ROOT);

    render() {
        // @ts-ignore
        const message = this.props.location.state?.message ? this.props.location.state.message : '404 - page not found';
        return (
            <div className="not-found-container">
                <div className="not-found-container__glitch-box">
                    <h1 className="not-found-container__glitch-box__word-0">{message}</h1>
                    <h1 className="not-found-container__glitch-box__word-1">{message}</h1>
                    <h1 className="not-found-container__glitch-box__word-2">{message}</h1>
                </div>
                <div className="not-found-container__go-home">
                    <button onClick={this.goToHome} className="button">Come Home</button>
                </div>
            </div>
        );
    }
}
