import { combineReducers } from "redux";
import { SyncResult } from "./sync";
import { CommitMessageChange } from "./commit";
import { OpenRepositoryResult } from "./repository";
import { IStoreState } from "../store/git-store";

export default combineReducers({
    FileState: SyncResult,
    CommitMessage: CommitMessageChange,
    RepositoryState: OpenRepositoryResult,
});
