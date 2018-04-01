import * as Git from "nodegit";
import { Sync } from "./sync";
import Settings, { REPOSITORY_PATH } from "../../core/settings";

export const OPEN_REPOSITORY = "OPEN_REPOSITORY";
export type OPEN_REPOSITORY = typeof OPEN_REPOSITORY;

export const OPEN_REPOSITORY_SUCCESS = "OPEN_REPOSITORY_SUCCESS";
export type OPEN_REPOSITORY_SUCCESS = typeof OPEN_REPOSITORY_SUCCESS;

export const OPEN_REPOSITORY_FAILURE = "OPEN_REPOSITORY_FAILURE";
export type OPEN_REPOSITORY_FAILURE = typeof OPEN_REPOSITORY_FAILURE;

export interface IOpenRepository {
    type: OPEN_REPOSITORY;
}

export interface IOpenRepositorySuccess {
    type: OPEN_REPOSITORY_SUCCESS;
    repository: Git.Repository;
    path: string;
}

export interface IOpenRepositoryFailure {
    type: OPEN_REPOSITORY_FAILURE;
    error: Error;
}

export type OpenRepository = IOpenRepository | IOpenRepositorySuccess | IOpenRepositoryFailure;

export function OpenInitialRepository() {
    return async (dispatch: any) => {
        const repoPath = await Settings.get(REPOSITORY_PATH) as string;
        dispatch(OpenRepository(repoPath));
    };
}

export function OpenRepository(path: string) {
    return async (dispatch: any) => {
        try {
            const repo = await Git.Repository.open(path);
            Settings.save({type: REPOSITORY_PATH, value: path});
            await dispatch(OpenRepositorySuccess(repo, path));
            dispatch(Sync());
        } catch (error) {
            dispatch(OpenRepositoryFailure(error));
        }
    };
}

export function OpenRepositorySuccess(repository: Git.Repository, path: string): OpenRepository {
    return {
        type: OPEN_REPOSITORY_SUCCESS,
        repository,
        path,
    };
}

export function OpenRepositoryFailure(error: Error): OpenRepository {
    return {
        type: OPEN_REPOSITORY_FAILURE,
        error,
    };
}
