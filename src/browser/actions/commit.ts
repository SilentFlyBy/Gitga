import * as Git from "nodegit";
import { IStoreState } from "../store/git-store";
import Settings from "../../core/settings";
import { Sync } from "./sync";
import GitConfig from "../../core/git/config";
import { NotificationSuccess, NotificationError } from "./notification";

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

export type Commit = ICommit | ICommitSuccess | ICommitFailure | ICommitMessageChange;

export function ChangeCommitMessage(message: string): Commit {
    return {
        type: COMMIT_MESSAGE_CHANGE,
        message,
    };
}

export function Commit() {
    return async (dispatch: any, getState: () => IStoreState) => {
        try {
            const state = getState();
            const repo = state.RepositoryState.Repository;
            const message = state.CommitMessage.CommitMessage;
            const author = await GitConfig.GetAuthor();
            const signature = Git.Signature.now(author.Name, author.Email);
            const index = await repo.index();
            const tree = await index.writeTree();

            let head;
            try {
                const h = await repo.head();
                const peeledHead = await h.peel(Git.Reference.TYPE.OID);
                head = [peeledHead.id()];
            }
            /* tslint:disable:no-empty one-line */
            catch {}

            await repo.createCommit("HEAD", signature, signature, message, tree, head);

            dispatch(CommitSuccess());
            dispatch(Sync());
        } catch (error) {
            dispatch(CommitFailure(error));
        }

    };
}

export function CommitSuccess() {
    return async (dispatch: any) => {
        dispatch(NotificationSuccess("Commit success"));
        dispatch(_CommitSuccess());
    };
}

export function _CommitSuccess(): Commit {
    return {
        type: COMMIT_SUCCESS,
    };
}

export function CommitFailure(error: Error) {
    return async (dispatch: any) => {
        dispatch(NotificationError(error.message));
        dispatch(_CommitFailure(error));
    };
}

export function _CommitFailure(error: Error): Commit {
    return {
        type: COMMIT_FAILURE,
        error,
    };
}