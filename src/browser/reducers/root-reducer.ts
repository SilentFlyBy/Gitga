import { combineReducers } from "redux";
import { SyncResult } from "./sync";
import { IStoreState } from "../store/git-store";

export default combineReducers({
    FileState: SyncResult,
});
