import { combineReducers } from "redux";
import { SyncResult } from "./sync";

export default combineReducers({
    FileState: SyncResult,
});
