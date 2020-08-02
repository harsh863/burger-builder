import {MenuItem} from "../../models/menu-item.model";
import React, {Component} from "react";
import './NavigationItems.scss';
import {NavigationItem} from "./NavigationItem/NavigationItem";

export class NavigationItems extends Component<NavigationItemsProps, NavigationItemsState>{
    state = {
        menuItems: [
            {id: 1, link: '/home', label: 'Burger Builder', is_active: true},
            {id: 2, link: '/checkout', label: 'Checkout'}
        ]
    }

    render() {
        return (
            <div className={this.props.desktopMode ? 'sm-navigation-items' : 'navigation-items'}>
                {this.state.menuItems.map(menuItem => <NavigationItem key={menuItem.id} item={menuItem} desktopMode={this.props.desktopMode}/>)}
            </div>
        );
    }
}
interface NavigationItemsProps{
    desktopMode: boolean;
}

interface NavigationItemsState {
    menuItems: MenuItem[];
}