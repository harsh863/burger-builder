import {MenuItem} from "../../Models/menu-item.model";
import React, {Component} from "react";
import './NavigationItems.scss';
import {NavigationItem} from "./NavigationItem/NavigationItem";
import {RoutePaths} from "../../Enum/route-paths.enum";

export class NavigationItems extends Component<NavigationItemsProps>{
    menuItems: MenuItem[] = [
        {id: 1, link: RoutePaths.BURGER_BUILDER, label: 'Burger Builder'},
        {id: 2, link: RoutePaths.MY_ORDERS, label: 'My Orders'},
        {id: 3, link: RoutePaths.LOGOUT, label: 'Logout'}
    ]

    render() {
        return (
            <div className={this.props.desktopMode ? 'sm-navigation-items' : 'navigation-items'}>
                {this.menuItems.map(menuItem => <NavigationItem key={menuItem.id} item={menuItem} desktopMode={this.props.desktopMode}/>)}
            </div>
        );
    }
}
interface NavigationItemsProps{
    desktopMode: boolean;
}