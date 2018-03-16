import {GitCommandRunner} from "../../core/git/git-command-runner";

export const FIND_GIT = "FIND_GIT";
export type FIND_GIT = typeof FIND_GIT;

export const FIND_GIT_SUCCESS = "FIND_GIT_SUCCESS";
export type FIND_GIT_SUCCESS = typeof FIND_GIT_SUCCESS;

export const FIND_GIT_FAILURE = "FIND_GIT_FAILURE";
export type FIND_GIT_FAILURE = typeof FIND_GIT_FAILURE;

export interface IFindGit {
    type: FIND_GIT;
}

export interface IFindGitSuccess {
    type: FIND_GIT_SUCCESS;
    gitPath: string;
}

export interface IFintGitFailure {
    type: FIND_GIT_FAILURE;
    error: Error;
}

export type FindGit = IFindGit | IFindGitSuccess | IFintGitFailure;

export function FindGit() {
    return async (dispatch: any) => {
        const gitPath = await GitCommandRunner.TryGetGitExecutable();
        dispatch(FindGitSuccess(gitPath));
    };
}

export function FindGitSuccess(path: string) {
    return {
        type: FIND_GIT_SUCCESS,
        gitPath: path,
    };
}
