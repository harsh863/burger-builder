import React, {Component} from "react";
import {Drawer} from "@material-ui/core";

export class SideDrawer extends Component<DrawerProps> {
    render() {
        return (
            <Drawer anchor={this.props.side} open={this.props.visible} onClose={this.props.onClose}>
                {this.props.children}
            </Drawer>
        );
    }
}
interface DrawerProps {
    side: 'left' | 'right' | 'top' | 'bottom';
    visible: boolean;
    onClose: (event: any) => void
}