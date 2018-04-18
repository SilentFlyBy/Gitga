import * as Git from "nodegit";
import { Sync } from "./sync";
import Settings from "../../core/settings";
import { ISuccessAction, IErrorAction } from ".";
import { FileUnselectAction } from "./file-view";

export const OPEN_REPOSITORY = "OPEN_REPOSITORY";
export type OPEN_REPOSITORY = typeof OPEN_REPOSITORY;

export const OPEN_REPOSITORY_SUCCESS = "OPEN_REPOSITORY_SUCCESS";
export type OPEN_REPOSITORY_SUCCESS = typeof OPEN_REPOSITORY_SUCCESS;

export const OPEN_REPOSITORY_FAILURE = "OPEN_REPOSITORY_FAILURE";
export type OPEN_REPOSITORY_FAILURE = typeof OPEN_REPOSITORY_FAILURE;

export interface IOpenRepository {
    type: OPEN_REPOSITORY;
}

export interface IOpenRepositorySuccess extends ISuccessAction {
    type: OPEN_REPOSITORY_SUCCESS;
    repository: Git.Repository;
    path: string;
}

export interface IOpenRepositoryFailure extends IErrorAction {
    type: OPEN_REPOSITORY_FAILURE;
}

export type OpenRepository = IOpenRepository | IOpenRepositorySuccess | IOpenRepositoryFailure;

export function OpenInitialRepository() {
    return async (dispatch: any) => {
        const repoPath = await Settings.getRepositoryPath();
        dispatch(OpenRepository(repoPath));
    };
}

export function OpenRepository(path: string) {
    return async (dispatch: any) => {
        try {
            const repo = await Git.Repository.open(path);
            await Settings.setRepositoryPath(path);
            await dispatch(OpenRepositorySuccess(repo, path));
            dispatch(Sync());
            dispatch(FileUnselectAction());
        } catch (error) {
            dispatch(OpenRepositoryFailure(error));
        }
    };
}

export function OpenRepositorySuccess(
    repository: Git.Repository,
    path: string,
    notificationMessage?: string,
): OpenRepository {
    return {
        type: OPEN_REPOSITORY_SUCCESS,
        repository,
        path,
        notificationMessage,
    };
}

export function OpenRepositoryFailure(error: Error): OpenRepository {
    return {
        type: OPEN_REPOSITORY_FAILURE,
        error,
    };
}
