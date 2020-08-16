import React, {Component} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import {TransitionProps} from "@material-ui/core/transitions";
import {Slide} from "@material-ui/core";
import './Notification.scss';

export class Notification extends Component<NotificationProps>{

    getTransitionComponent(props: TransitionProps, direction: 'left' | 'down' | 'right' | 'up') {
        return <Slide {...props} direction={direction} />;
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.onClose(true);
        }, 2500);
    }

    render() {
        return (
            <Snackbar
                open
                className={this.props.type}
                TransitionComponent={(props => this.getTransitionComponent(props, this.props.direction || 'down'))}
                message={this.props.message}
            />
        );
    }
}

interface NotificationProps {
    message: string;
    direction: 'left' | 'down' | 'right' | 'up';
    onClose: (closed: boolean) => void;
    type: 'success' | 'error' | 'info';
}