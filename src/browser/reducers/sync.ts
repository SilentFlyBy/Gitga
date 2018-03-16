import { Sync, SYNC, SYNC_SUCCESS, ISyncSuccess } from "../actions/sync";
import { IStoreState } from "../store/git-store";
import { IFileStatus } from "../../core/git/file-status";

export function SyncSuccess(state: IFileStatus[] = [], action: ISyncSuccess): IFileStatus[] {
    switch (action.type) {
        case SYNC_SUCCESS:
            return action.newFileStates;
    }

    return state;
}
