import React, {Component} from "react";
import './MenuDrawer.scss';
import {AppLogo} from "../AppLogo/AppLogo";
import {NavigationItems} from "../NavigationItems/NavigationItems";
import {SideDrawer} from "../../Helper/Drawer/Drawer";

class MenuDrawer extends Component<MenuDrawerProps> {
    render() {
        return (
            <SideDrawer side={this.props.side}
                        visible={this.props.drawerVisible}
                        onClose={this.props.onDrawerToggle}>
                <div className='drawer'>
                    <div className="drawer__burger-logo">
                        <AppLogo />
                    </div>
                    <div>
                        <NavigationItems desktopMode={this.props.desktopMode} />
                    </div>
                </div>
            </SideDrawer>
        );
    }
}

export default MenuDrawer;

interface MenuDrawerProps {
    side: 'left' | 'right' | 'top' | 'bottom';
    desktopMode: boolean;
    drawerVisible: boolean;
    onDrawerToggle: () => void;
}