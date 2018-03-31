import * as Git from "nodegit";
import { IStoreState } from "../store/git-store";

export const COMMIT = "COMMIT";
export type COMMIT = typeof COMMIT;

export const COMMIT_SUCCESS = "COMMIT_SUCCESS";
export type COMMIT_SUCCESS = typeof COMMIT_SUCCESS;

export const COMMIT_FAILURE = "COMMIT_FAILURE";
export type COMMIT_FAILURE = typeof COMMIT_FAILURE;

export const COMMIT_MESSAGE_CHANGE = "COMMIT_MESSAGE_CHANGE";
export type COMMIT_MESSAGE_CHANGE = typeof COMMIT_MESSAGE_CHANGE;

export interface ICommitMessageChange {
    type: COMMIT_MESSAGE_CHANGE;
    message: string;
}

export interface ICommit {
    type: COMMIT;
}

export interface ICommitSuccess {
    type: COMMIT_SUCCESS;
}

export interface ICommitFailure {
    type: COMMIT_FAILURE;
    error: Error;
}

export type CommitMessageChange = ICommitMessageChange;
export type Commit = ICommit | ICommitSuccess | ICommitFailure;

export function ChangeCommitMessage(message: string): CommitMessageChange {
    return {
        type: COMMIT_MESSAGE_CHANGE,
        message,
    };
}

export function Commit() {
    return async (dispatch: any, getState: () => IStoreState) => {
        const repo = getState().RepositoryState.Repository;
        const signature = new Git.Signature();
        // repo.createCommit("HEAD")
    };
}
