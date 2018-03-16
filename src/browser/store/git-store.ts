import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/root-reducer";
import thunk from "redux-thunk";
import { IFileStatus } from "../../core/git/file-status";

export default function configureStore() {
    return createStore(
        rootReducer,
        applyMiddleware(thunk),
    );
}

export interface IStoreState {
    FileState: IStoreFileState;
}

export interface IStoreFileState {
    FileState: IFileStatus[];
    Error: Error;
}
