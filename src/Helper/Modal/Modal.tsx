import React, {Component} from "react";
import {Backdrop} from "@material-ui/core";
import './Modal.scss';

export class Modal extends Component<ModalProps> {
    stopEventPropagation = (event: any) => {
        event.stopPropagation();
    }

    render() {
        return (
            <Backdrop style={{zIndex: 100000}} open={this.props.open} onClick={this.props.onClose}>
                <div onClick={this.stopEventPropagation}>
                    {this.props.children}
                </div>
            </Backdrop>
        )
    }
}

interface ModalProps {
    open: boolean;
    onClose: (event: any) => void;
}