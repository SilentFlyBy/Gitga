import * as Git from "nodegit";
import { ISuccessAction, IErrorAction } from ".";
import { IStoreState } from "../store/git-store";

export const PUSH = "PUSH";
export type PUSH = typeof PUSH;

export const PUSH_SUCCESS = "PUSH_SUCCESS";
export type PUSH_SUCCESS = typeof PUSH_SUCCESS;

export const PUSH_FAILURE = "PUSH_FAILURE";
export type PUSH_FAILURE = typeof PUSH_FAILURE;

export interface IPush {
    type: PUSH;
}

export interface IPushSuccess extends ISuccessAction {
    type: PUSH_SUCCESS;
}

export interface IPushFailure extends IErrorAction {
    type: PUSH_FAILURE;
}

export type Push = IPush | IPushSuccess | IPushFailure;

export function Push() {
    return async (dispatch: any, getState: () => IStoreState) => {
        const state = getState();
        const repo = state.RepositoryState.Repository;

        let remote: Git.Remote;
        try {
            remote = await repo.getRemote("origin");
        } catch {
            // TODO: create remote
            remote = undefined;
        }

        try {
            await remote.push(
                ["refs/heads/master:refs/heads/master"],
                {
                    callbacks: {
                        credentials: (urlString: string, userName: string) => {
                            return Git.Cred.sshKeyFromAgent(userName);
                        },
                    },
                },
            );

            dispatch(PushSuccess("Push success"));
        } catch (error) {
            dispatch(PushFailure(error));
        }
    };
}

export function PushSuccess(notificationMessage?: string): Push {
    return {
        type: PUSH_SUCCESS,
        notificationMessage,
    };
}

export function PushFailure(error: Error): Push {
    return {
        type: PUSH_FAILURE,
        error,
    };
}
