import * as Git from "nodegit";
import { IStoreState } from "../store/git-store";
import { NotificationSuccess } from "./notification";

export const SYNC = "SYNC";
export type SYNC = typeof SYNC;

export const SYNC_SUCCESS = "SYNC_SUCCESS";
export type SYNC_SUCCESS = typeof SYNC_SUCCESS;

export const SYNC_FAILURE = "SYNC_FAILURE";
export type SYNC_FAILURE = typeof SYNC_FAILURE;

export interface ISync {
    type: SYNC;
}

export interface ISyncSuccess {
    type: SYNC_SUCCESS;
    newFileStates: Git.StatusFile[];
}

export interface ISyncFailure {
    type: SYNC_FAILURE;
    error: Error;
}

export type Sync = ISync | ISyncSuccess | ISyncFailure;

export function Sync() {
    return async (dispatch: any, getState: () => IStoreState) => {
        try {
            const repo = getState().RepositoryState.Repository;
            const statuses = await repo.getStatusExt();
            dispatch(SyncSuccess(statuses));
        } catch (error) {
            dispatch(SyncFailure(error));
        }
    };
}

export function SyncSuccess(newFileStates: Git.StatusFile[]) {
    return async (dispatch: any) => {
        dispatch(NotificationSuccess("Sync success"));
        dispatch(_SyncSuccess(newFileStates));
    };
}

export function _SyncSuccess(newFileStates: Git.StatusFile[]): Sync {
    return {
        type: SYNC_SUCCESS,
        newFileStates,
    };
}

export function SyncFailure(error: Error): Sync {
    return {
        type: SYNC_FAILURE,
        error,
    };
}
