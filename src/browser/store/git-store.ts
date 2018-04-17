import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/root-reducer";
import thunk from "redux-thunk";
import * as path from "path";
import * as Git from "nodegit";
import { NotificationType } from "../components/app/notification";
import {createLogger} from "redux-logger";
import { Middleware } from "redux";
import notificationCreator from "../middleware/notification-creator";

const middlewares: Middleware[] = [];

middlewares.push(thunk);
middlewares.push(notificationCreator);

if (process.env.NODE_ENV === "development") {
    const logger = createLogger({
        collapsed: true,
    });

    middlewares.push(logger);
}

export default function configureStore() {
    return compose(applyMiddleware(...middlewares))(createStore)(rootReducer);
}

export interface IStoreState {
    FileState: IStoreFileState;
    CommitMessage: ICommitMessageState;
    RepositoryState: IRepositoryState;
    NotificationState: INotificationState[];
}

export interface IStoreFileState {
    FileState: Git.StatusFile[];
}

export interface ICommitMessageState {
    CommitMessage: string;
}

export interface IRepositoryState {
    Repository: Git.Repository;
    RepositoryPath: string;
}

export interface IErrorState {
    Error: Error;
}

export interface INotificationState {
    Message: string;
    Type: NotificationType;
    Timestamp: number;
}
