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

const initialState: INotificationState = {
    Type: undefined,
    Message: undefined,
};

export function NotificationReducer(
    state: INotificationState = initialState,
    action: NotificationAction,
): INotificationState {
    switch (action.type) {
        case NOTIFICATION_ADVICE:
            return { ...state, Type: NotificationType.Advice, Message: action.message };

        case NOTIFICATION_ERROR:
            return { ...state, Type: NotificationType.Error, Message: action.message };

        case NOTIFICATION_SUCCESS:
            return { ...state, Type: NotificationType.Success, Message: action.message };

        case NOTIFICATION_WARNING:
            return { ...state, Type: NotificationType.Warning, Message: action.message };

        case NOTIFICATION_CLEAR:
            return initialState;
    }

    return state;
}
