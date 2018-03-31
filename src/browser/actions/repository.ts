import * as Git from "nodegit";
import { Sync } from "./sync";

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
}

export interface IOpenRepositoryFailure {
    type: OPEN_REPOSITORY_FAILURE;
    error: Error;
}

export type OpenRepository = IOpenRepository | IOpenRepositorySuccess | IOpenRepositoryFailure;

export function OpenRepository(path: string) {
    return async (dispatch: any) => {
        try {
            const repo = await Git.Repository.open(path);
            await dispatch(OpenRepositorySuccess(repo));
            dispatch(Sync());
        } catch (error) {
            dispatch(OpenRepositoryFailure(error));
        }
    };
}

export function OpenRepositorySuccess(repository: Git.Repository): OpenRepository {
    return {
        type: OPEN_REPOSITORY_SUCCESS,
        repository,
    };
}

export function OpenRepositoryFailure(error: Error): OpenRepository {
    return {
        type: OPEN_REPOSITORY_FAILURE,
        error,
    };
}
