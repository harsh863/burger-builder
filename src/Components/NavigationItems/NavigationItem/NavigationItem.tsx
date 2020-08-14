import {Component} from "react";
import {MenuItem} from "../../../Models/menu-item.model";
import React from "react";
import './NavigationItem.scss';
import {NavLink} from "react-router-dom";

export class NavigationItem extends Component<NavigationItemProps, any>{
    render() {
        return (
            <div className={!this.props.desktopMode ? 'xs-navigation-item' : 'sm-navigation-item' }>
                <NavLink to={this.props.item.link} replace>{this.props.item.label}</NavLink>
            </div>
        );
    }
}

interface NavigationItemProps{
    item: MenuItem;
    desktopMode: boolean;
}