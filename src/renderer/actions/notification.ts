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

export interface INotificationAdvice {
    type: NOTIFICATION_ADVICE;
    message: string;
    timestamp: number;
}

export interface INotificationError {
    type: NOTIFICATION_ERROR;
    message: string;
    timestamp: number;
}

export interface INotificationSuccess {
    type: NOTIFICATION_SUCCESS;
    message: string;
    timestamp: number;
}

export interface INotificationWarning {
    type: NOTIFICATION_WARNING;
    message: string;
    timestamp: number;
}

export interface INotificationClear {
    type: NOTIFICATION_CLEAR;
    timestamp: number;
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
        timestamp: Date.now(),
    };
}

export function NotificationError(message: string): NotificationAction {
    return {
        type: NOTIFICATION_ERROR,
        message,
        timestamp: Date.now(),
    };
}

export function NotificationSuccess(message: string): NotificationAction {
    return {
        type: NOTIFICATION_SUCCESS,
        message,
        timestamp: Date.now(),
    };
}

export function NotificationWarning(message: string): NotificationAction {
    return {
        type: NOTIFICATION_WARNING,
        message,
        timestamp: Date.now(),
    };
}

export function NotificationClear(timestamp: number): NotificationAction {
    return {
        type: NOTIFICATION_CLEAR,
        timestamp,
    };
}
