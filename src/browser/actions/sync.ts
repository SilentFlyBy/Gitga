import { FileStatusProcessor, IFileStatus } from "../../core/git/file-status";

export const SYNC = "SYNC";
export type SYNC = typeof SYNC;

export const SYNC_SUCCESS = "SYNC_SUCCESS";
export type SYNC_SUCCESS  = typeof SYNC_SUCCESS;

export interface ISync {
    type: SYNC;
}

export interface ISyncSuccess {
    type: SYNC_SUCCESS;
    newFileStates: IFileStatus[];
}

export type Sync = ISync | ISyncSuccess;

export function Sync() {
    return async (dispatch: any) => {
        const newFileStates = await new FileStatusProcessor().GetAllFileStates();
        dispatch(SyncSuccess(newFileStates));
    };
}

export function SyncSuccess(newFileStates: IFileStatus[]): Sync {
    return {
        type: SYNC_SUCCESS,
        newFileStates,
    };
}
