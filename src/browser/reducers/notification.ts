import { INotificationState } from "../store/git-store";
import {
    NotificationAction,
    NOTIFICATION_ADVICE,
    NOTIFICATION_ERROR,
    NOTIFICATION_SUCCESS,
    NOTIFICATION_WARNING,
    NOTIFICATION_CLEAR,
} from "../actions/notification";
import { NotificationType } from "../components/app/notification";

export function NotificationReducer(
    state: INotificationState[] = [],
    action: NotificationAction,
): INotificationState[] {
    switch (action.type) {
        case NOTIFICATION_ADVICE:
            return [...state, { Type: NotificationType.Advice, Message: action.message, Timestamp: action.timestamp }];

        case NOTIFICATION_ERROR:
            return [...state, { Type: NotificationType.Error, Message: action.message, Timestamp: action.timestamp }];

        case NOTIFICATION_SUCCESS:
            return [...state, { Type: NotificationType.Success, Message: action.message, Timestamp: action.timestamp }];

        case NOTIFICATION_WARNING:
            return [...state, { Type: NotificationType.Warning, Message: action.message, Timestamp: action.timestamp }];

        case NOTIFICATION_CLEAR:
            const newState = state.filter((n) => n.Timestamp !== action.timestamp);
            return newState;
        default:
            return state;
    }
}
