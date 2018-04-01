export const NOTIFICATION_SUCCESS = "NOTIFICATION_SUCCESS";
export type NOTIFICATION_SUCCESS = typeof NOTIFICATION_SUCCESS;

export const NOTIFICATION_ADVICE = "NOTIFICATION_ADVICE";
export type NOTIFICATION_ADVICE = typeof NOTIFICATION_ADVICE;

export const NOTIFICATION_WARNING = "NOTIFICATION_WARNING";
export type NOTIFICATION_WARNING = typeof NOTIFICATION_WARNING;

export const NOTIFICATION_ERROR = "NOTIFICATION_ERROR";
export type NOTIFICATION_ERROR = typeof NOTIFICATION_ERROR;

export const NOTIFICATION_CLEAR = "NOTIFICATION_CLEAR";
export type NOTIFICATION_CLEAR = typeof NOTIFICATION_CLEAR;

export type NOTIFICATION_ACTION =
    NOTIFICATION_ADVICE
    | NOTIFICATION_ERROR
    | NOTIFICATION_SUCCESS
    | NOTIFICATION_WARNING
    | NOTIFICATION_CLEAR;

interface INotificationAdvice {
    type: NOTIFICATION_ACTION;
    message: string;
}

interface INotificationError {
    type: NOTIFICATION_ERROR;
    message: string;
}

interface INotificationSuccess {
    type: NOTIFICATION_SUCCESS;
    message: string;
}

interface INotificationWarning {
    type: NOTIFICATION_WARNING;
    message: string;
}

interface INotificationClear {
    type: NOTIFICATION_CLEAR;
}

export type NotificationAction =
    INotificationAdvice
    | INotificationError
    | INotificationSuccess
    | INotificationWarning
    | INotificationClear;

export function NotificationAdvice(message: string): NotificationAction {
    return {
        type: NOTIFICATION_ADVICE,
        message,
    };
}

export function NotificationError(message: string): NotificationAction {
    return {
        type: NOTIFICATION_ERROR,
        message,
    };
}

export function NotificationSuccess(message: string): NotificationAction {
    return {
        type: NOTIFICATION_SUCCESS,
        message,
    };
}

export function NotificationWarning(message: string): NotificationAction {
    return {
        type: NOTIFICATION_WARNING,
        message,
    };
}

export function NotificationClear(): NotificationAction {
    return {
        type: NOTIFICATION_CLEAR,
        message: undefined,
    };
}
