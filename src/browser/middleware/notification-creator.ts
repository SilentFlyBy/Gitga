import { MiddlewareAPI } from "redux";
import { Middleware } from "redux";
import { Dispatch } from "redux";
import { NotificationSuccess, NotificationError } from "../actions/notification";
import { ISuccessAction, IErrorAction } from "../actions";

type IAction = ISuccessAction | IErrorAction;

const notificationCreator: Middleware = <S>(api: MiddlewareAPI<S>) =>
    (next: Dispatch<S>) =>
    <A extends IAction>(action: A): A => {
        const result = next(action);

        const successAction = action as ISuccessAction;
        const failureAction = action as IErrorAction;

        if (successAction !== undefined) {
            const message = successAction.notificationMessage;
            if (message !== undefined && message.length > 0) {
                api.dispatch(NotificationSuccess(message));
            }
        }

        if (failureAction !== undefined) {
            if (failureAction.error !== undefined) {
                const message = failureAction.error.message;
                api.dispatch(NotificationError(message));
            }
        }

        return result;
};

export default notificationCreator;
