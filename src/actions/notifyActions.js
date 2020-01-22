import { NOTIFY_USER } from './types';

export const setNotification = (message, messageType) => {
    return({
        type: NOTIFY_USER,
        message: message,
        messageType: messageType
    });
}