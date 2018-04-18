import { combineReducers } from "redux";
import { SyncReducer } from "./sync";
import { CommitReducer } from "./commit";
import { RepositoryReducer } from "./repository";
import { ErrorReducer } from "./error";
import { NotificationReducer } from "./notification";
import { FileViewReducer } from "./file-view";

export default combineReducers({
    FileState: SyncReducer,
    CommitMessage: CommitReducer,
    RepositoryState: RepositoryReducer,
    ErrorState: ErrorReducer,
    NotificationState: NotificationReducer,
    SelectedFileState: FileViewReducer,
});
