import ReactDOM from "react-dom";
import React from "react";
import {Notification} from "../Helper/Notification/Notification";

export class NotificationService {
    private static instance: NotificationService;

    static getInstance(): NotificationService {
        if (!NotificationService.instance) {
            NotificationService.instance = new NotificationService();
        }
        return NotificationService.instance;
    }

    showNotification = (message: string, type: 'success' | 'error' | 'info', direction: 'left' | 'down' | 'right' | 'up' = 'left') => {
        const overlayDiv = document.createElement('div');
        overlayDiv.id = 'overlayDiv';
        document.body.appendChild(overlayDiv);
        ReactDOM.render(
            <Notification direction={direction} message={message} type={type} onClose={this.onClose}/>,
            document.getElementById('overlayDiv')
        )
    }

    private onClose = () => {
        document.getElementById('overlayDiv')?.remove();
    }
}