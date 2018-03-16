import { combineReducers } from "redux";
import { SyncResult } from "./sync";
import { FindGitResult } from "./git";
import { IStoreState } from "../store/git-store";

export default combineReducers({
    FileState: SyncResult,
    GitPath: FindGitResult,
});
