import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/root-reducer";
import thunk from "redux-thunk";
import * as path from "path";
import * as Git from "nodegit";
import {app} from "electron";
import { NotificationType } from "../components/app/notification";

export default function configureStore() {
    return createStore(
        rootReducer,
        applyMiddleware(thunk),
    );
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
