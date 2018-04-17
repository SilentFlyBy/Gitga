import { Sync, SYNC_SUCCESS } from "../actions/sync";

import { IStoreFileState } from "../store/git-store";

const initialStoreFileState: IStoreFileState = {
    FileState: [],
};

export function SyncReducer(state: IStoreFileState = initialStoreFileState, action: Sync): IStoreFileState {
    switch (action.type) {
        case SYNC_SUCCESS:
            return {...state, FileState: action.newFileStates};
        default:
            return state;
    }
}
