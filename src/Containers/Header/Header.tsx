import React, {Component, Fragment} from "react";
import {AppLogo} from "../../Components/AppLogo/AppLogo";
import './Header.scss';
import {NavigationItems} from "../../Components/NavigationItems/NavigationItems";
import MenuDrawer from "../../Components/MenuDrawer/MenuDrawer";

export class Header extends Component<any, HeaderState>{
    state = {
        desktopMode: true,
        drawerVisible: false
    }

    toggleDrawer = () => {
        this.setState(state => ({drawerVisible: !state.drawerVisible}));
    }

    onResize = () => {
        this.setState({desktopMode: window.innerWidth > 600, drawerVisible: false});
    }

    componentDidMount() {
        this.setState({desktopMode: window.innerWidth > 600});
        window.addEventListener('resize', this.onResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    render() {
        return (
            <Fragment>
                <div className='app-bar'>
                    {
                        this.state.desktopMode ? null :
                            <div className='app-bar__toggle-drawer' onClick={this.toggleDrawer}>
                                <div />
                                <div />
                                <div />
                            </div>
                    }
                    <div className='app-bar__app-logo'>
                        <AppLogo />
                    </div>
                    {
                        this.state.desktopMode ?
                            <div>
                                <NavigationItems desktopMode={this.state.desktopMode} />
                            </div> : null
                    }
                </div>
                {
                    this.state.drawerVisible ?
                        <MenuDrawer side="left"
                                    drawerVisible={this.state.drawerVisible}
                                    onDrawerToggle={this.toggleDrawer}
                                    desktopMode={this.state.desktopMode} /> : null
                }
            </Fragment>
        );
    }
}

interface HeaderState {
    desktopMode: boolean;
    drawerVisible: boolean;
}
