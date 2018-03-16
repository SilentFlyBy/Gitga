import { FileStatusProcessor, IFileStatus } from "../../core/git/file-status";

export const SYNC = "SYNC";
export type SYNC = typeof SYNC;

export const SYNC_SUCCESS = "SYNC_SUCCESS";
export type SYNC_SUCCESS  = typeof SYNC_SUCCESS;

export const SYNC_FAILURE = "SYNC_FAILURE";
export type SYNC_FAILURE = typeof SYNC_FAILURE;

export interface ISync {
    type: SYNC;
}

export interface ISyncSuccess {
    type: SYNC_SUCCESS;
    newFileStates: IFileStatus[];
}

export interface ISyncFailure {
    type: SYNC_FAILURE;
    error: Error;
}

export type Sync = ISync | ISyncSuccess | ISyncFailure;

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

export function ISyncFailure(error: Error): Sync {
    return {
        type: SYNC_FAILURE,
        error,
    };
}
