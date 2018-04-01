import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/root-reducer";
import thunk from "redux-thunk";
import * as path from "path";
import * as Git from "nodegit";
import {app} from "electron";

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
}

export interface IStoreFileState {
    FileState: Git.StatusFile[];
    Error: Error;
}

export interface ICommitMessageState {
    CommitMessage: string;
}

export interface IRepositoryState {
    Repository: Git.Repository;
    RepositoryPath: string;
    Error: Error;
}
