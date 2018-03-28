import { Sync, SYNC, SYNC_SUCCESS, ISyncSuccess, SYNC_FAILURE } from "../actions/sync";

import { IStoreFileState } from "../store/git-store";

const initialStoreFileState: IStoreFileState = {
    FileState: [],
    Error: null,
};

export function SyncResult(state: IStoreFileState = initialStoreFileState, action: Sync): IStoreFileState {
    switch (action.type) {
        case SYNC_SUCCESS:
            return {...state, FileState: action.newFileStates};
        case SYNC_FAILURE:
            return {...state, Error: action.error};
    }

    return state;
}
